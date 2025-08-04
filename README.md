
---

# 📚 Enrollment Management Web App

<!-- SHIELDS -->
[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge\&logo=cloudinary\&logoColor=white)](https://cloudinary.com/)

---

## 📖 About the Project

This application aims to streamline the enrollment process in a primary school, solving common challenges in enrollment management.

* 👨‍👩‍👧‍👦 **Parents** can register their children, check the enrollment status, and, if rejected, submit an appeal (with a justification).
* ✅ If accepted, they can see the assigned class for their children.
* 🧑‍💼 **Staff** members can approve or reject applications. If rejected, the appeal is automatically forwarded to another staff member.
* 👨‍🏫 **Teachers** can view their class rosters.
* 🛠️ **Admins** have access to analytical reports related to the enrollment process.

> ⚠️ **Note:** This project is a demonstration that follows best security practices, but the access credentials are public for testing purposes.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🛠️ Built With

* **Next.js** – A React framework for building modern web apps with routing, SSR, and more.
* **PostgreSQL** – A powerful open-source relational database.
* **Prisma** – A modern ORM for Node.js and TypeScript.
* **TailwindCSS** – A utility-first CSS framework for styling UI directly in the markup.
* **Cloudinary** – A cloud-based service for storing and delivering media assets.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🚀 Live Demo

You can test the app here: ***INSERT\_URL\_HERE*** (link to be updated)

### 👥 Test Credentials

| Role     | Email                          | Password        |
| -------- | ------------------------------ | --------------- |
| Employee | `amanda.lee@employee.esjm.com` | `employeepass1` |
| Admin    | `admin@esjm.com`               | `adminpass1`    |

> Regular users (parents) can register themselves to enroll their children.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🧑‍💻 Running Locally

### 📦 Prerequisites

* [Node.js](https://nodejs.org/en)
* [PNPM](https://pnpm.io/)
* A **Cloudinary** account for image uploads
* A PostgreSQL database (hosted or local via Docker)

### ⚙️ Environment Setup

Create a `.env` file in the root of the project with the following content:

```env
AUTH_SECRET="your secret"
DATABASE_URL="your database url"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your cloudinary app name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your cloudinary api key"
CLOUDINARY_API_SECRET="your cloudinary api secret"

ID_BOY_PHOTO="your public url for a boy photo"
ID_GIRL_PHOTO="your public url for a girl photo"
```

### 🧪 Installation & Setup

```bash
pnpm install
pnpm exec prisma db seed
pnpm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 📈 Roadmap

* [x] Student registration flow
* [x] Appeal workflow
* [x] Role-based dashboard (Admin, Employee, Parent, Teacher)
* [ ] Notifications via email
* [ ] Multi-language support

Feel free to suggest new features via issues or pull requests!

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🤝 Contributing

Contributions are what make the open-source community amazing. If you'd like to contribute:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

<p align="right">(<a href="#top">back to top</a>)</p>


---
* And all contributors & testers

<p align="right">(<a href="#top">back to top</a>)</p>

---

Would you like a Markdown `.md` file version or should I just copy this into a file for you?
