import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [category, setCategory] = useState("student");
  const [form, setForm] = useState({
    // common
    name: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    // student
    country: "",
    state: "",
    city: "",
    universityName: "",
    department: "",
    course: "",
    semester: "",
    endOfYear: "",
    aadharNumber: "",
    address: "",
    mobileNumber: "",
    enrollmentNumber: "",
    collegeId: "",
    instituteEmail: "",
    grNo: "",
    // startup
    startupCompanyName: "",
    ownerName: "",
    companyEmail: "",
    companyMobile: "",
    dpCertificate: "no", // "yes" | "no"
    dpCertificateNumber: "",
    udyamCertificate: "no", // "yes" | "no"
    udyamCertificateNumber: "",
    companyType: "",
    ownerAadhar: "",
    startupGstin: "",
    companyDetails: "",
    // commercial / company
    commercialCompanyName: "",
    commercialGstin: "",
    commercialCompanyType: "",
    commercialBusinessType: "",
    commercialCompanyNumber: "",
    commercialAadhar: "",
    commercialAddress: "",
    // categorization for commercial
    commercialScale: "",
    commercialCategory: "",
  });

  const [files, setFiles] = useState({ idCard: null, photo: null });
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  const idRef = useRef(null);
  const photoRef = useRef(null);

  const allowedFiles = [".pdf", ".jpg", ".jpeg", ".png"];

  const update = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  function handleFile(name, e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const lower = f.name.toLowerCase();
    const ok = allowedFiles.some((ext) => lower.endsWith(ext));
    if (!ok) {
      setErrors((s) => ({ ...s, [name]: "Allowed: PDF, JPG, PNG" }));
      e.target.value = "";
      return;
    }
    setErrors((s) => ({ ...s, [name]: null }));
    setFiles((s) => ({ ...s, [name]: f }));
  }

  function validate() {
    const e = {};

    // common validations
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.email))
      e.email = "Valid email required";
    if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";

    // phone/mobile validations (allow 7-15 digits)
    if (
      !/^[0-9]{7,15}$/.test(
        form.phone || form.mobileNumber || form.companyMobile || ""
      )
    ) {
      e.phone = "Enter a valid phone number (7-15 digits)";
    }

    if (!agreed) e.terms = "You must agree to the terms";

    // category specific
    if (category === "student") {
      if (!form.country) e.country = "Country required";
      if (!form.state) e.state = "State required";
      if (!form.city) e.city = "City required";
      if (!form.universityName) e.universityName = "University name required";
      if (!form.department) e.department = "Department required";
      if (!form.course) e.course = "Course required";
      if (!form.semester) e.semester = "Semester required";
      if (!form.endOfYear) e.endOfYear = "End of year required";
      if (!/^[0-9]{12}$/.test(form.aadharNumber || ""))
        e.aadharNumber = "Aadhar must be 12 digits";
      if (!form.address) e.address = "Address required";
      if (!form.enrollmentNumber)
        e.enrollmentNumber = "Enrollment number required";
      if (!form.collegeId) e.collegeId = "College ID required";
      if (
        !form.instituteEmail ||
        !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.instituteEmail)
      )
        e.instituteEmail = "Institute email required";
      if (!form.grNo) e.grNo = "GR No is required";

   
    }

    if (category === "startup") {
      if (!form.startupCompanyName)
        e.startupCompanyName = "Company name required";
      if (!form.ownerName) e.ownerName = "Owner name required";
      if (
        !form.companyEmail ||
        !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.companyEmail)
      )
        e.companyEmail = "Valid company email required";
      if (!/^[0-9]{7,15}$/.test(form.companyMobile || ""))
        e.companyMobile = "Valid company mobile required";
      if (!form.companyType) e.companyType = "Select company type";
      if (!/^[0-9]{12}$/.test(form.ownerAadhar || ""))
        e.ownerAadhar = "Owner Aadhar must be 12 digits";
      if (!form.startupGstin) e.startupGstin = "GSTIN required";
      if (!form.companyDetails || form.companyDetails.trim().length < 20)
        e.companyDetails = "Provide at least 20 characters of company details";

      if (form.dpCertificate === "yes" && !form.dpCertificateNumber)
        e.dpCertificateNumber = "Please provide DP certificate number";
      if (form.udyamCertificate === "yes" && !form.udyamCertificateNumber)
        e.udyamCertificateNumber = "Please provide Udyam certificate number";
    }

    if (category === "commercial") {
      if (!form.commercialCompanyName)
        e.commercialCompanyName = "Company name required";
      if (!form.commercialGstin) e.commercialGstin = "GSTIN required";
      if (!form.commercialCompanyType)
        e.commercialCompanyType = "Company type required";
      if (!form.commercialBusinessType)
        e.commercialBusinessType = "Business type required";
      if (!/^[0-9]{7,15}$/.test(form.commercialCompanyNumber || ""))
        e.commercialCompanyNumber = "Company number required (7-15 digits)";
      if (!/^[0-9]{12}$/.test(form.commercialAadhar || ""))
        e.commercialAadhar = "Aadhar must be 12 digits";
      if (!form.commercialAddress) e.commercialAddress = "Address required";

      // categorization validations
      if (!form.commercialScale) e.commercialScale = "Select business scale";
      if (!form.commercialCategory)
        e.commercialCategory = "Select business category";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // Prepare payload (demo)
    const payload = { category, ...form };
    // if student with files -> would use FormData in real API

    console.log("submit payload", payload, files);
    alert("Registration successful (demo). Check console for payload.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-black from-slate-900 to-black text-slate-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Register</h1>
          <p className="text-sm text-slate-400 mb-6">
            Choose your category and complete the form.
          </p>

          <div className="flex gap-3 mb-6" role="tablist" aria-label="Category">
            {[
              { id: "student", label: "Student" },
              { id: "startup", label: "Startup" },
              { id: "commercial", label: "Commercial" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                type="button"
                aria-pressed={category === c.id}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  category === c.id
                    ? "bg-white text-slate-900 border-transparent"
                    : "bg-slate-700/60 text-slate-200 border-slate-600"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* COMMON FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm text-slate-300">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full mt-1 p-3 rounded-md bg-slate-900 border border-slate-700"
                />
                {errors.name && (
                  <div className="text-rose-400 text-xs mt-1">
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-sm text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full mt-1 p-3 rounded-md bg-slate-900 border border-slate-700"
                />
                {errors.email && (
                  <div className="text-rose-400 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="text-sm text-slate-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="w-full mt-1 p-3 rounded-md bg-slate-900 border border-slate-700"
                />
                {errors.password && (
                  <div className="text-rose-400 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirm" className="text-sm text-slate-300">
                  Confirm Password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={form.confirm}
                  onChange={(e) => update("confirm", e.target.value)}
                  className="w-full mt-1 p-3 rounded-md bg-slate-900 border border-slate-700"
                />
                {errors.confirm && (
                  <div className="text-rose-400 text-xs mt-1">
                    {errors.confirm}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="text-sm text-slate-300">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full mt-1 p-3 rounded-md bg-slate-900 border border-slate-700"
                />
                {errors.phone && (
                  <div className="text-rose-400 text-xs mt-1">
                    {errors.phone}
                  </div>
                )}
              </div>
              <div /> {/* spare column */}
            </div>

            {/* STUDENT */}
            {category === "student" && (
              <section
                aria-labelledby="student-details"
                className="bg-slate-800/30 border border-slate-700 rounded-lg p-4"
              >
                <h3 id="student-details" className="font-semibold">
                  Student Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label htmlFor="country" className="text-sm text-slate-300">
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      autoComplete="country"
                      value={form.country}
                      onChange={(e) => update("country", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.country && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.country}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="text-sm text-slate-300">
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.state && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.state}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label htmlFor="city" className="text-sm text-slate-300">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.city && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.city}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="universityName"
                      className="text-sm text-slate-300"
                    >
                      University Name
                    </label>
                    <input
                      id="universityName"
                      name="universityName"
                      autoComplete="organization"
                      value={form.universityName}
                      onChange={(e) => update("universityName", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.universityName && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.universityName}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="department"
                      className="text-sm text-slate-300"
                    >
                      Department
                    </label>
                    <input
                      id="department"
                      name="department"
                      value={form.department}
                      onChange={(e) => update("department", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.department && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.department}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="course" className="text-sm text-slate-300">
                      Course
                    </label>
                    <input
                      id="course"
                      name="course"
                      value={form.course}
                      onChange={(e) => update("course", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.course && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.course}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="semester"
                      className="text-sm text-slate-300"
                    >
                      Semester
                    </label>
                    <input
                      id="semester"
                      name="semester"
                      value={form.semester}
                      onChange={(e) => update("semester", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.semester && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.semester}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="endOfYear"
                      className="text-sm text-slate-300"
                    >
                      End of the year
                    </label>
                    <input
                      id="endOfYear"
                      name="endOfYear"
                      placeholder="e.g. 2026"
                      value={form.endOfYear}
                      onChange={(e) => update("endOfYear", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.endOfYear && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.endOfYear}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="aadharNumber"
                      className="text-sm text-slate-300"
                    >
                      Aadhar Number
                    </label>
                    <input
                      id="aadharNumber"
                      name="aadharNumber"
                      inputMode="numeric"
                      maxLength={12}
                      autoComplete="off"
                      value={form.aadharNumber}
                      onChange={(e) =>
                        update(
                          "aadharNumber",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.aadharNumber && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.aadharNumber}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="text-sm text-slate-300">
                      Address (Aadhar based)
                    </label>
                    <input
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.address && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.address}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="mobileNumber"
                      className="text-sm text-slate-300"
                    >
                      Mobile Number
                    </label>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      autoComplete="tel"
                      value={form.mobileNumber}
                      onChange={(e) => update("mobileNumber", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enrollmentNumber"
                      className="text-sm text-slate-300"
                    >
                      Enrollment Number
                    </label>
                    <input
                      id="enrollmentNumber"
                      name="enrollmentNumber"
                      value={form.enrollmentNumber}
                      onChange={(e) =>
                        update("enrollmentNumber", e.target.value)
                      }
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="collegeId"
                      className="text-sm text-slate-300"
                    >
                      College ID
                    </label>
                    <input
                      id="collegeId"
                      name="collegeId"
                      value={form.collegeId}
                      onChange={(e) => update("collegeId", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="instituteEmail"
                      className="text-sm text-slate-300"
                    >
                      Institute Email
                    </label>
                    <input
                      id="instituteEmail"
                      name="instituteEmail"
                      type="email"
                      autoComplete="email"
                      value={form.instituteEmail}
                      onChange={(e) => update("instituteEmail", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.instituteEmail && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.instituteEmail}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div>
                    <label htmlFor="idCard" className="text-sm text-slate-300">
                      Upload ID Card
                    </label>
                    <div className="flex gap-2 mt-2 items-center">
                      <button
                        type="button"
                        onClick={() => idRef.current?.click()}
                        className="px-3 py-2 bg-white text-slate-800 font-semibold rounded-md"
                      >
                        Choose file
                      </button>
                      <input
                        ref={idRef}
                        id="idCard"
                        name="idCard"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFile("idCard", e)}
                        className="hidden"
                      />
                      <div className="text-sm text-slate-300">
                        {files.idCard ? files.idCard.name : "No file"}
                      </div>
                    </div>
                    {errors.idCard && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.idCard}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="photo" className="text-sm text-slate-300">
                      Photo Proof
                    </label>
                    <div className="flex gap-2 mt-2 items-center">
                      <button
                        type="button"
                        onClick={() => photoRef.current?.click()}
                        className="px-3 py-2 bg-white text-slate-800 font-semibold rounded-md"
                      >
                        Choose file
                      </button>
                      <input
                        ref={photoRef}
                        id="photo"
                        name="photo"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFile("photo", e)}
                        className="hidden"
                      />
                      <div className="text-sm text-slate-300">
                        {files.photo ? files.photo.name : "No file"}
                      </div>
                    </div>
                    {errors.photo && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.photo}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <label htmlFor="grNo" className="text-sm text-slate-300">
                    GR No.
                  </label>
                  <input
                    id="grNo"
                    name="grNo"
                    value={form.grNo}
                    onChange={(e) => update("grNo", e.target.value)}
                    className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                  />
                  {errors.grNo && (
                    <div className="text-rose-400 text-xs mt-1">
                      {errors.grNo}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* STARTUP */}
            {category === "startup" && (
              <section
                aria-labelledby="startup-details"
                className="bg-slate-800/30 border border-slate-700 rounded-lg p-4"
              >
                <h3 id="startup-details" className="font-semibold">
                  Startup Details
                </h3>

                <div className="mt-3">
                  <label
                    htmlFor="startupCompanyName"
                    className="text-sm text-slate-300"
                  >
                    Company name
                  </label>
                  <input
                    id="startupCompanyName"
                    name="startupCompanyName"
                    value={form.startupCompanyName}
                    onChange={(e) =>
                      update("startupCompanyName", e.target.value)
                    }
                    className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                  />
                  {errors.startupCompanyName && (
                    <div className="text-rose-400 text-xs mt-1">
                      {errors.startupCompanyName}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="ownerName"
                      className="text-sm text-slate-300"
                    >
                      Owner Name
                    </label>
                    <input
                      id="ownerName"
                      name="ownerName"
                      value={form.ownerName}
                      onChange={(e) => update("ownerName", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.ownerName && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.ownerName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="companyEmail"
                      className="text-sm text-slate-300"
                    >
                      Company Email Address
                    </label>
                    <input
                      id="companyEmail"
                      name="companyEmail"
                      type="email"
                      autoComplete="email"
                      value={form.companyEmail}
                      onChange={(e) => update("companyEmail", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.companyEmail && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.companyEmail}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="companyMobile"
                      className="text-sm text-slate-300"
                    >
                      Company Mobile Number
                    </label>
                    <input
                      id="companyMobile"
                      name="companyMobile"
                      type="tel"
                      autoComplete="tel"
                      value={form.companyMobile}
                      onChange={(e) => update("companyMobile", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.companyMobile && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.companyMobile}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="companyType"
                      className="text-sm text-slate-300"
                    >
                      Company Type
                    </label>
                    <select
                      id="companyType"
                      name="companyType"
                      value={form.companyType}
                      onChange={(e) => update("companyType", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    >
                      <option value="">Select type</option>
                      <option value="Private Limited">Private Limited</option>
                      <option value="LLP">LLP</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Sole Proprietorship">
                        Sole Proprietorship
                      </option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.companyType && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.companyType}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="ownerAadhar"
                      className="text-sm text-slate-300"
                    >
                      Owner Aadhar Card
                    </label>
                    <input
                      id="ownerAadhar"
                      name="ownerAadhar"
                      maxLength={12}
                      inputMode="numeric"
                      autoComplete="off"
                      value={form.ownerAadhar}
                      onChange={(e) =>
                        update("ownerAadhar", e.target.value.replace(/\D/g, ""))
                      }
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.ownerAadhar && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.ownerAadhar}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="startupGstin"
                      className="text-sm text-slate-300"
                    >
                      GST Number
                    </label>
                    <input
                      id="startupGstin"
                      name="startupGstin"
                      autoComplete="off"
                      value={form.startupGstin}
                      onChange={(e) => update("startupGstin", e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.startupGstin && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.startupGstin}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="dpCertificate"
                    className="text-sm text-slate-300"
                  >
                    DP ID Certificate?
                  </label>
                  <select
                    id="dpCertificate"
                    name="dpCertificate"
                    value={form.dpCertificate}
                    onChange={(e) => update("dpCertificate", e.target.value)}
                    className="w-40 mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>

                  {form.dpCertificate === "yes" && (
                    <div className="mt-2">
                      <label
                        htmlFor="dpCertificateNumber"
                        className="text-sm text-slate-300"
                      >
                        DP Certificate Number
                      </label>
                      <input
                        id="dpCertificateNumber"
                        name="dpCertificateNumber"
                        value={form.dpCertificateNumber}
                        onChange={(e) =>
                          update("dpCertificateNumber", e.target.value)
                        }
                        className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                      />
                      {errors.dpCertificateNumber && (
                        <div className="text-rose-400 text-xs mt-1">
                          {errors.dpCertificateNumber}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="udyamCertificate"
                    className="text-sm text-slate-300"
                  >
                    Udyam Certificate?
                  </label>
                  <select
                    id="udyamCertificate"
                    name="udyamCertificate"
                    value={form.udyamCertificate}
                    onChange={(e) => update("udyamCertificate", e.target.value)}
                    className="w-40 mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>

                  {form.udyamCertificate === "yes" && (
                    <div className="mt-2">
                      <label
                        htmlFor="udyamCertificateNumber"
                        className="text-sm text-slate-300"
                      >
                        Udyam Certificate Number
                      </label>
                      <input
                        id="udyamCertificateNumber"
                        name="udyamCertificateNumber"
                        value={form.udyamCertificateNumber}
                        onChange={(e) =>
                          update("udyamCertificateNumber", e.target.value)
                        }
                        className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                      />
                      {errors.udyamCertificateNumber && (
                        <div className="text-rose-400 text-xs mt-1">
                          {errors.udyamCertificateNumber}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="companyDetails"
                    className="text-sm text-slate-300"
                  >
                    Company Details (max 200 words)
                  </label>
                  <textarea
                    id="companyDetails"
                    name="companyDetails"
                    value={form.companyDetails}
                    onChange={(e) => update("companyDetails", e.target.value)}
                    maxLength={200 * 6}
                    rows={4}
                    className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                  />
                  {errors.companyDetails && (
                    <div className="text-rose-400 text-xs mt-1">
                      {errors.companyDetails}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* COMMERCIAL */}
            {category === "commercial" && (
              <section
                aria-labelledby="commercial-details"
                className="bg-slate-800/30 border border-slate-700 rounded-lg p-4"
              >
                <h3 id="commercial-details" className="font-semibold">
                  Commercial / Company Details
                </h3>

                <div className="mt-3">
                  <label
                    htmlFor="commercialCompanyName"
                    className="text-sm text-slate-300"
                  >
                    Company Name
                  </label>
                  <input
                    id="commercialCompanyName"
                    name="commercialCompanyName"
                    value={form.commercialCompanyName}
                    onChange={(e) =>
                      update("commercialCompanyName", e.target.value)
                    }
                    className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                  />
                  {errors.commercialCompanyName && (
                    <div className="text-rose-400 text-xs mt-1">
                      {errors.commercialCompanyName}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="commercialGstin"
                      className="text-sm text-slate-300"
                    >
                      GST Number
                    </label>
                    <input
                      id="commercialGstin"
                      name="commercialGstin"
                      autoComplete="off"
                      value={form.commercialGstin}
                      onChange={(e) =>
                        update("commercialGstin", e.target.value)
                      }
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.commercialGstin && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.commercialGstin}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="commercialCompanyType"
                      className="text-sm text-slate-300"
                    >
                      Company Type
                    </label>
                    <input
                      id="commercialCompanyType"
                      name="commercialCompanyType"
                      value={form.commercialCompanyType}
                      onChange={(e) =>
                        update("commercialCompanyType", e.target.value)
                      }
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.commercialCompanyType && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.commercialCompanyType}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="commercialBusinessType"
                    className="text-sm text-slate-300"
                  >
                    Business Type (e.g. Scale)
                  </label>
                  <input
                    id="commercialBusinessType"
                    name="commercialBusinessType"
                    value={form.commercialBusinessType}
                    onChange={(e) =>
                      update("commercialBusinessType", e.target.value)
                    }
                    className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                  />
                  {errors.commercialBusinessType && (
                    <div className="text-rose-400 text-xs mt-1">
                      {errors.commercialBusinessType}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="commercialCompanyNumber"
                      className="text-sm text-slate-300"
                    >
                      Company Number
                    </label>
                    <input
                      id="commercialCompanyNumber"
                      name="commercialCompanyNumber"
                      value={form.commercialCompanyNumber}
                      onChange={(e) =>
                        update("commercialCompanyNumber", e.target.value)
                      }
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.commercialCompanyNumber && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.commercialCompanyNumber}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="commercialAadhar"
                      className="text-sm text-slate-300"
                    >
                      Aadhar Number
                    </label>
                    <input
                      id="commercialAadhar"
                      name="commercialAadhar"
                      inputMode="numeric"
                      maxLength={12}
                      autoComplete="off"
                      value={form.commercialAadhar}
                      onChange={(e) =>
                        update(
                          "commercialAadhar",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                    {errors.commercialAadhar && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.commercialAadhar}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="commercialAddress"
                    className="text-sm text-slate-300"
                  >
                    Address
                  </label>
                  <input
                    id="commercialAddress"
                    name="commercialAddress"
                    autoComplete="street-address"
                    value={form.commercialAddress}
                    onChange={(e) =>
                      update("commercialAddress", e.target.value)
                    }
                    className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                  />
                  {errors.commercialAddress && (
                    <div className="text-rose-400 text-xs mt-1">
                      {errors.commercialAddress}
                    </div>
                  )}
                </div>

                {/* 3 categorizations for commercial */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <div>
                    <label
                      htmlFor="commercialScale"
                      className="text-sm text-slate-300"
                    >
                      Business Scale
                    </label>
                    <select
                      id="commercialScale"
                      name="commercialScale"
                      value={form.commercialScale}
                      onChange={(e) =>
                        update("commercialScale", e.target.value)
                      }
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    >
                      <option value="">Select scale</option>
                      <option value="micro">Micro</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                    {errors.commercialScale && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.commercialScale}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="commercialCategory"
                      className="text-sm text-slate-300"
                    >
                      Business Category
                    </label>
                    <select
                      id="commercialCategory"
                      name="commercialCategory"
                      value={form.commercialCategory}
                      onChange={(e) =>
                        update("commercialCategory", e.target.value)
                      }
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    >
                      <option value="">Select category</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Service">Service</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.commercialCategory && (
                      <div className="text-rose-400 text-xs mt-1">
                        {errors.commercialCategory}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="commercialCompanyTypeShort"
                      className="text-sm text-slate-300"
                    >
                      Company Type (short)
                    </label>
                    <input
                      id="commercialCompanyTypeShort"
                      name="commercialCompanyTypeShort"
                      value={form.commercialCompanyType}
                      onChange={(e) =>
                        update("commercialCompanyType", e.target.value)
                      }
                      className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
                    />
                  </div>
                </div>
              </section>
            )}

            <div className="flex items-center gap-3 mt-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="w-4 h-4"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm text-slate-400">
                I agree to the terms and privacy policy
              </label>
            </div>

            {errors.terms && (
              <div className="text-rose-400 text-xs mt-1">{errors.terms}</div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white text-slate-900 border-transparent font-semibold"
              >
                Create Account
              </button>
            </div>
          </form>
        <p className="text-sm text-slate-300 mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-white underline">
            Login Now
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}
