import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'home',
    loadChildren:()=>import('./home/home.module').then(m=>m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'voice',
    loadChildren: () => import('./voice/voice.module').then( m => m.VoicePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'text',
    loadChildren: () => import('./text/text.module').then( m => m.TextPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-prescription/:id',
    loadChildren: () => import('./edit-prescription/edit-prescription.module').then( m => m.EditPrescriptionPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'templates',
    loadChildren: () => import('./templates/templates.module').then( m => m.TemplatesPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'template/:id',
    loadChildren: () => import('./template/template.module').then( m => m.TemplatePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'options/:id',
    loadChildren: () => import('./options/options.module').then( m => m.OptionsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-prescription/:id',
    loadChildren: () => import('./view-prescription/view-prescription.module').then( m => m.ViewPrescriptionPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'security-pin/:id',
    loadChildren: () => import('./security-pin/security-pin.module').then( m => m.SecurityPinPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'update-pin',
    loadChildren: () => import('./update-pin/update-pin.module').then( m => m.UpdatePinPageModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
