/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';


import { MemberComponent } from './Member/Member.component';
import { PartnerComponent } from './Partner/Partner.component';

import { EarnPointsComponent } from './EarnPoints/EarnPoints.component';
import { UsePointsComponent } from './UsePoints/UsePoints.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Member', component: MemberComponent },
  { path: 'Partner', component: PartnerComponent },
  { path: 'EarnPoints', component: EarnPointsComponent },
  { path: 'UsePoints', component: UsePointsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
