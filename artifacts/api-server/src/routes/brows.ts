import { Router } from "express";
import multer from "multer";
import { toFile } from "openai";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are accepted"));
  },
});

const BROW_PROMPT =
  "Add perfectly shaped, natural-looking professional eyebrows to this person's face. " +
  "The brows should be well-groomed, defined with microblading-style hair strokes, and beautifully suit the person's unique facial structure and bone shape. " +
  "Use a warm brunette or natural tone that complements the person's hair color and skin tone. " +
  "The shape should be gently arched and symmetrical — enhancing the face without looking overdone. " +
  "Only change the eyebrows. Preserve everything else about the photo — background, lighting, skin, hair, makeup, expression — exactly as it is.";

router.post("/brows/try-on", upload.single("photo"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "No photo uploaded" });
    return;
  }

  try {
    const imageFile = await toFile(file.buffer, "photo.png", {
      type: "image/png",
    });

    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      prompt: BROW_PROMPT,
      size: "1024x1024",
    });

    const b64 = response.data[0]?.b64_json ?? "";
    res.json({ result: b64 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Processing failed";
    res.status(500).json({ error: message });
  }
});

export default router;
