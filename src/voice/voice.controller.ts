import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { VoiceService } from './voice.service';

@Controller('voice')
export class VoiceController {
  constructor(private voiceService: VoiceService) {}

  @Post('get')
  async getVoice(
    @Body('model') model: string,
    @Body('speed') speed: number,
    @Body('input') input: string,
    @Body('voice_id') voiceId: string,
    @Res() res: Response
  ): Promise<any> {
    try {
      const result = await this.voiceService.getVoice({ model, speed, input, voiceId });
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  }
}
