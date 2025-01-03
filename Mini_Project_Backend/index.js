import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import multer from "multer";
import PDFParser from "pdf2json"; import { fileURLToPath } from "url";
import cors from 'cors'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;


app.use(cors())
app.use(bodyParser.json());


const openai = new OpenAI({
    organization: 'YOUR_ORGANIZATION_ID',
    project: 'YOUR_PROJECT_ID',
    apiKey: process.env.OPEN_API_KEY,
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads"); // Save files to the "uploads" folder
    },
    filename: (req, file, cb) => {
        const oldPdfPath = path.join(__dirname, './uploads/a.pdf');
        if (fs.existsSync(oldPdfPath)) {
            fs.unlinkSync(oldPdfPath); // Delete old PDF if it exists
        }
        cb(null, "a.pdf"); // Always save the new PDF as "a.pdf"
    },
});
const upload = multer({ storage });


const parsePDF = () => {

    const pdfParser = new PDFParser(this, 1);

    pdfParser.on("pdfParser_dataError", (errData) =>
        console.error(errData.parserError)
    );

    pdfParser.on("pdfParser_dataReady", () => {
        fs.writeFile(
            "./pdf2json/raw.txt",
            pdfParser.getRawTextContent(),
            () => {
                console.log("Done.");
            }
        );
    });


    pdfParser.loadPDF("./uploads/a.pdf");
};


app.post("/upload", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error("No file uploaded.");
        }


        parsePDF();

        res.status(200).json({
            message: "PDF uploaded and parsed successfully.",
            filePath: req.file.path,
        });
    } catch (error) {
        console.error("Error uploading or parsing PDF:", error);
        res.status(500).json({ error: error.message || "Failed to upload or parse the PDF" });
    }
});


app.post("/ask", async (req, res) => {
    try {

        if (!fs.existsSync(path.join(__dirname, "./pdf2json/raw.txt"))) {
            return res.status(400).json({ error: "No parsed PDF content found. Please upload a valid PDF first." });
        }


        const pdfContent = fs.readFileSync(path.join(__dirname, "./pdf2json/raw.txt"), "utf-8");


        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "No question provided" });
        }


        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `The following is the text of a PDF document:\n\n${pdfContent}\n\nBased on using only this text, answer the following question:\n${question}` },
            ],
        });

        const answer = response.choices[0]?.message?.content || "No answer available.";

        res.json({ answer });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
