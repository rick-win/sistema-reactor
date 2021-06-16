import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

const myModules: any = [MatToolbarModule];

@NgModule({
    imports: [...myModules],
    exports: [...myModules],
})

export class MaterialModule{}