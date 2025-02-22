import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then(m => m.HeaderPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'create-link',
    loadChildren: () => import('./create-link/create-link.module').then( m => m.CreateLinkPageModule)
  },
  {
    path:'**',
    component:PageNotFoundComponent
  },
  {
    path: 'banner',
    loadChildren: () => import('./banner/banner.module').then( m => m.BannerPageModule)
  },


  // {
  //   path: 'footer',
  //   loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
