
import { useEffect, useState } from "react";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load student records. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-semibold text-violet-600">
          Loading students...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-10 text-center font-medium text-rose-600">
        {error}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-10 text-center text-white shadow-lg sm:py-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-100">
          Student Directory
        </p>

        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Our Students
        </h1>

        <p className="mt-3 text-violet-100">
          Student records fetched from a dummy API
        </p>

        <div className="mx-auto mt-6 inline-block rounded-full bg-white/20 px-5 py-2 font-semibold">
          Total Students: {students.length}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="group rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-2xl font-bold text-violet-700 transition group-hover:bg-violet-600 group-hover:text-white">
                {student.name.charAt(0)}
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-bold text-slate-800">
                  {student.name}
                </h2>
                <p className="text-sm text-violet-600">
                  Student ID: {student.id}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
              <p className="break-words text-slate-600">
                <span className="mb-1 block font-semibold text-slate-800">
                  Email
                </span>
                {student.email}
              </p>

              <p className="text-slate-600">
                <span className="mb-1 block font-semibold text-slate-800">
                  Phone
                </span>
                {student.phone}
              </p>

              <p className="text-slate-600">
                <span className="mb-1 block font-semibold text-slate-800">
                  City
                </span>
                {student.address.city}
              </p>
            </div>

            <div className="mt-5">
              <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                Registered Student
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;