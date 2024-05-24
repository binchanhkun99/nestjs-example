import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VoiceService {
    async getVoice(data: { model: string; speed: number; input: string; voiceId: string }): Promise<any> {
        const { model, speed, input, voiceId } = data;
        const url = "https://api.ttsopenai.com/api/v1/public/text-to-speech-stream";
        const payload = {
            model: model,
            speed: speed,
            input: input,
            voice_id: voiceId
        };

        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
            "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Add your actual authorization token here
            "Cache-Control": "no-cache",
            "Origin": "https://ttsopenai.com",
            "Pragma": "no-cache",
            "Referer": "https://ttsopenai.com/",
            "Sec-Ch-Ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "\"Windows\"",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Create the voice directory if it doesn't exist
            const directoryPath = path.resolve('voice');
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
            }
            const filePath = path.join(directoryPath, 'response_audio.mp3');
            fs.writeFileSync(filePath, buffer);

            console.log(`Audio file saved to ${filePath}`);
            return { success: true };
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
