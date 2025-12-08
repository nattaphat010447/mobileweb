import { Student } from "./models/Student.js";
import { StudentManager } from "./models/managers/StudentManager.js";
import { showList } from "./utils/showList.js";


const manager = new StudentManager();
manager.loadFromLocalStorage();


function renderTable(elementId: string = "studentTableBody"): void {
  const tableBody = document.getElementById(elementId)!;
  tableBody.innerHTML = "";
  const students =manager.getAllStudents();
  showList<Student>(students);
  students.forEach((s) => {
    tableBody.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>แก้ไขเป็น title_name</td>
        <td>แก้ไขเป็น first_name</td>
        <td>แก้ไขเป็น last_name</td>
        <td>แก้ไขเป็น email</td>
        <td>${s.year}</td>
        <td>${s.major}</td>
      </tr>
    `;
  });
}


(document.getElementById("addBtn") as HTMLButtonElement).onclick = () => {
  const id = (document.getElementById("id") as HTMLInputElement).value;
  const year = Number((document.getElementById("year") as HTMLInputElement).value);
  const major = (document.getElementById("major") as HTMLInputElement).value;
   //  เพิ่ม title_name,first_name,last_name, email ให้ครบ
  const student: Student = { id, year, major, title_name: "", first_name: "", last_name: "", email: "" };
  manager.addStudent(student);
  renderTable();
};


(document.getElementById("searchNameBtn") as HTMLButtonElement).onclick = () => {
  const keyword = (document.getElementById("searchName") as HTMLInputElement).value;
  const results = manager.findStudentsByName(keyword);
  showList<Student>(results);
  alert(`ผลการค้นหา: ${results.length} คน`);
};


(document.getElementById("searchMajorBtn") as HTMLButtonElement).onclick = () => {
  const keyword = (document.getElementById("searchMajor") as HTMLInputElement).value;
  const results = manager.findStudentsByMajor(keyword);
  showList<Student>(results);
  alert(`พบในสาขา: ${results.length} คน`);
};


// เพิ่มค้นหาด้วย Email
(document.getElementById("searchEmailBtn") as HTMLButtonElement).onclick = () => {
  const keyword = (document.getElementById("searchEmail") as HTMLInputElement).value;
  const results = manager.findStudentsByEmail(keyword);
  showList<Student>(results);
  alert(`ผลการค้นหา: ${results.length} คน`);
}

renderTable("studentTableBody");