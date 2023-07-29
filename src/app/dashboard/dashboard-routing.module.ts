import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardPage } from "./dashboard.page";
import { SubCategoryComponent } from "./sub-category/sub-category.component";
import { NewitemComponent } from "./sub-category/newitem/newitem.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardPage,
  },
  {
    path: "create",
    loadChildren: () =>
      import("./create/create.module").then((m) => m.CreatePageModule),
  },
  {
    path: "sub-category/:id",
    children: [
      {
        path: "",
        component: SubCategoryComponent,
      },
      {
        path:"create",
        component:NewitemComponent
      },
      {
        path: "cart-section",
        loadChildren: () =>
          import("./cart-section/cart-section.module").then(
            (m) => m.CartSectionPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
