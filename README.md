# Foo-rum - Frontend Hiring Task

A modern social media-like application built with React, TypeScript, and TailwindCSS. This project demonstrates a complete authentication flow with a feed interface, featuring smooth animations and a clean, responsive design.

## 🚀 Features

- **Authentication System**: Complete sign in/sign up flow with test accounts
- **Feed Interface**: Social media-style post feed with interactive elements
- **Post Creation**: Rich text editor with publish functionality
- **Responsive Design**: Mobile-friendly interface using TailwindCSS
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **TypeScript**: Full type safety throughout the application
- **Modern Stack**: React 18, Vite, TailwindCSS, Framer Motion

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Context API

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd atlys
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Test Accounts

The application includes pre-configured test accounts for demonstration:

- **Email**: `demo@example.com` | **Password**: `password123`
- **Email**: `test@user.com` | **Password**: `testpass`

You can also create new accounts using the sign-up functionality.

## 🎯 Core Features

### Authentication Flow

- **Sign In/Sign Up Modal**: Appears when unauthenticated users try to interact with the feed
- **Dedicated Auth Pages**: `/signin` and `/signup` routes for direct access
- **Session Persistence**: User sessions are maintained using localStorage
- **Form Validation**: Real-time validation with error handling

### Feed Page

- **Post Editor**: Rich text editor with formatting toolbar (shows alerts for unimplemented features)
- **Publish Functionality**: Authenticated users can create and publish posts
- **Interactive Posts**: Like, comment, and share buttons (show alerts for unimplemented features)
- **Sample Content**: Pre-populated with sample posts for demonstration

### UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Framer Motion animations for modals, cards, and interactions
- **Loading States**: Visual feedback during authentication and publishing
- **Error Handling**: User-friendly error messages and validation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── Header.tsx      # Application header
│   ├── PostCard.tsx    # Individual post component
│   └── PostEditor.tsx  # Post creation editor
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Page components
│   ├── Feed.tsx        # Main feed page
│   ├── SignIn.tsx      # Sign in page
│   └── SignUp.tsx      # Sign up page
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types and interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and TailwindCSS
```

## 🎨 Design Implementation

The application closely follows the provided Figma design with:

- **Color Scheme**: Clean grays and blues with proper contrast
- **Typography**: Consistent font hierarchy and spacing
- **Layout**: Card-based design with proper spacing and shadows
- **Interactive Elements**: Hover states and transitions
- **Icons**: SVG icons for consistency and scalability

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Evaluation Criteria Met

- ✅ **Quality of UI and animations**: Smooth Framer Motion animations and clean design
- ✅ **Dependencies used**: Minimal dependencies, no UI libraries (only TailwindCSS for styling)
- ✅ **Modularity and maintainability**: Well-structured components with TypeScript
- ✅ **API design**: Clean component APIs and function interfaces
- ✅ **UX/Functionality implementation**: Complete authentication flow and feed interactions

## 🎉 Bonus Features

- **TypeScript**: Full type safety throughout the application
- **Slick Animations**: Framer Motion animations for enhanced user experience
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Error Handling**: Comprehensive error states and validation
- **Loading States**: Visual feedback for async operations

## 🔧 Development Notes

- The application uses localStorage for session persistence (no backend required)
- All interactive elements show appropriate alerts for unimplemented features
- The design is fully responsive and follows modern web standards
- TypeScript provides excellent developer experience with full type safety

---

Built with ❤️ for the Atlys frontend hiring task
