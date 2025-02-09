import { Application } from "./Application";
import { ApplicationDTO } from "./ApplicationDTO";

export interface UpdateProps{
    app: Application,
    update(app: ApplicationDTO, appId: string): Promise<void>,
    hide(): void
}