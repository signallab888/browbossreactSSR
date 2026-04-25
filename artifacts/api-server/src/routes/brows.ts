import { Router } from "express";
import multer from "multer";
import { toFile } from "openai";
import { PNG } from "pngjs";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are accepted"));
  },
});

// ─── Step 1: Ask GPT-4o to locate the brow regions in the photo ──────────────
async function detectBrowRegions(imageBase64: string): Promise<{
  left: { x1: number; y1: number; x2: number; y2: number };
  right: { x1: number; y1: number; x2: number; y2: number };
} | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5.1",
      max_completion_tokens: 300,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${imageBase64}`,
                detail: "high",
              },
            },
            {
              type: "text",
              text:
                "Locate the eyebrow regions in this face photo. Return ONLY a raw JSON object — no markdown, no code fences, just the JSON. Format: " +
                '{"left":{"x1":0.0,"y1":0.0,"x2":0.0,"y2":0.0},"right":{"x1":0.0,"y1":0.0,"x2":0.0,"y2":0.0}} ' +
                "where all values are fractions of the image dimensions (0.0–1.0). " +
                "left = the person's left brow (right side of photo), right = person's right brow (left side of photo). " +
                "Make each region generously sized: add 20px worth of padding around each brow. " +
                "If no face is detected, return: null",
            },
          ],
        },
      ],
    });

    const raw = response.choices[0]?.message?.content?.trim() ?? "";
    if (raw === "null" || !raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// ─── Step 2: Create a PNG mask ────────────────────────────────────────────────
// Transparent (alpha=0) where edits are allowed (brow area)
// Opaque white (alpha=255) everywhere else (protected)
function createMask(
  size: number,
  regions: { x1: number; y1: number; x2: number; y2: number }[]
): Buffer {
  const png = new PNG({ width: size, height: size, filterType: -1 });

  // Fill entire mask with opaque white (protected)
  for (let i = 0; i < size * size; i++) {
    const idx = i * 4;
    png.data[idx] = 255;
    png.data[idx + 1] = 255;
    png.data[idx + 2] = 255;
    png.data[idx + 3] = 255;
  }

  // Make each brow region transparent (editable)
  for (const r of regions) {
    const x1 = Math.max(0, Math.floor(r.x1 * size));
    const x2 = Math.min(size - 1, Math.ceil(r.x2 * size));
    const y1 = Math.max(0, Math.floor(r.y1 * size));
    const y2 = Math.min(size - 1, Math.ceil(r.y2 * size));
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        const idx = (size * y + x) * 4;
        png.data[idx + 3] = 0; // transparent = AI can edit here
      }
    }
  }

  return PNG.sync.write(png);
}

const BROW_PROMPT =
  "Add natural, professional eyebrows with microblading-style fine hair strokes in the transparent regions. " +
  "The brows should be gently arched, symmetrical, and perfectly suit the person's facial structure. " +
  "Use a tone that matches the person's hair color and skin tone. " +
  "Do not alter skin, eyes, nose, mouth, hair, or any part of the face outside the brow area.";

router.post("/brows/try-on", upload.single("photo"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "No photo uploaded" });
    return;
  }

  try {
    const imageBase64 = file.buffer.toString("base64");

    // Detect brow positions using vision
    const brows = await detectBrowRegions(imageBase64);

    let resultBuffer: Buffer;

    if (brows) {
      // Build mask only exposing brow areas
      const IMAGE_SIZE = 1024;
      const maskBuffer = createMask(IMAGE_SIZE, [brows.left, brows.right]);

      const imageFile = await toFile(file.buffer, "photo.png", { type: "image/png" });
      const maskFile = await toFile(maskBuffer, "mask.png", { type: "image/png" });

      const response = await openai.images.edit({
        model: "gpt-image-1",
        image: imageFile,
        mask: maskFile,
        prompt: BROW_PROMPT,
        size: "1024x1024",
      });

      const b64 = response.data[0]?.b64_json ?? "";
      resultBuffer = Buffer.from(b64, "base64");
    } else {
      // Fallback: no face detected — still try without mask but warn
      const imageFile = await toFile(file.buffer, "photo.png", { type: "image/png" });
      const response = await openai.images.edit({
        model: "gpt-image-1",
        image: imageFile,
        prompt: BROW_PROMPT,
        size: "1024x1024",
      });
      const b64 = response.data[0]?.b64_json ?? "";
      resultBuffer = Buffer.from(b64, "base64");
    }

    res.json({ result: resultBuffer.toString("base64") });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Processing failed";
    res.status(500).json({ error: message });
  }
});

export default router;
