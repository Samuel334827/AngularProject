import { authGuard } from './core/guards/auth/auth.guard';
// import { BrandsComponent } from './pages/brands/brands.component';
// import { Component } from '@angular/core';
// import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
// import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
// import { HomeComponent } from './pages/home/home.component';
// import { CartComponent } from './pages/cart/cart.component';
// import { ProductsComponent } from './pages/products/products.component';
// import { CategoriesComponent } from './pages/categories/categories.component';
// import { CheckoutComponent } from './pages/checkout/checkout.component';
// import { NotfoundComponent } from './pages/notfound/notfound.component';

// export const routes: Routes = [
//     {path:"", redirectTo:"home",pathMatch:"full"},
//     {path:"",component:AuthLayoutComponent, children:[
//         {path:"login", component:LoginComponent},
//         {path:"register",component:RegisterComponent}
//     ]},
//     {path:"",component:BlankLayoutComponent,children:[
//         {path:"home",component:HomeComponent,title:"home"},
//         {path:"cart",component:CartComponent,title:"home"},
//         {path:"products",component:ProductsComponent,title:"home"},
//         {path:"brands",component:BrandsComponent,title:"home"},
//         {path:"categories",component:CategoriesComponent,title:"home"},
//         {path:"checkout",component:CheckoutComponent,title:"home"},
//         {path:"**",component:NotfoundComponent}
//     ]}
// ];
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { loginGuard } from './core/guards/login/login.guard';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      { path: "login", loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
      canActivate:[loginGuard]
    },
      { path: "register", loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
      
      { path: "forgot", loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      
    ]
  },

  {
    path: "",
    component: BlankLayoutComponent,
    children: [
      { path: "home",
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: "Home",
        canActivate:([authGuard]), },
      { path: "cart", loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: "Cart" },
      { path: "allorders", loadComponent: () => import('./pages/allorders/allorders/allorders.component').then(m => m.AllordersComponent), title: "Your Orders" },
      { path: "products", loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: "Products" },
      { path: "brands", loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: "Brands" },
      { path: "categories", loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: "Categories" },
      { path: "checkout/:id", loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: "Checkout" },
      { path: "details/:id", loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), title: "details" },
      { path: "wishlist", loadComponent: () => import('./pages/whishlist/wishlist/wishlist.component').then(m => m.WishlistComponent), title: "wishlist" },
      { path: "categorydetails/:id", loadComponent: () => import('./pages/categorydetails/categorydetails/categorydetails.component').then(m => m.CategorydetailsComponent), title: "categorydetails" },
      { path: "**", component: NotfoundComponent }
    ]
  }
];
