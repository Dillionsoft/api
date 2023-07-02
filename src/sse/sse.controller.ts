import { ApiTags } from "@nestjs/swagger";
import { SseService } from "./sse.service";
import { Controller, Req, Sse } from "@nestjs/common";





@ApiTags("SSE")
@Controller('sse')
export class SseController{
    constructor(private readonly sseService:SseService){}

    @Sse('account')
    sse(@Req() req:any){
        return this.sseService.getAccountCreationProgress(req.user)
    }
}