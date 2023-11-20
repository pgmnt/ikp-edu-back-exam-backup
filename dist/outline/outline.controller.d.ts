import { OutlineService } from './outline.service';
export declare class OutlineController {
    private outlineService;
    constructor(outlineService: OutlineService);
    getid(id: string): Promise<any>;
}
