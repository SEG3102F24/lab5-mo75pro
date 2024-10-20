import { Injectable, inject } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Employee} from "../model/employee";
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  setDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  async addEmployee(employee: Employee): Promise<void> {
    try {

      const employeesCollection = collection(this.firestore, 'employees');

      await addDoc(employeesCollection, { ...employee });

      this.employees$.next([...this.employees$.getValue(), employee]);
      console.log('Employee added successfully!');
    } catch (error) {
      console.error('Error adding employee: ', error);
    }
  }
}
