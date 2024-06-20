import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), CommonModule],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class AppRoutingModule { }