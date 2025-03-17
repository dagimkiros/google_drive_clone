"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  File,
  FileText,
  Folder,
  Grid3X3,
  Home,
  ImageIcon,
  List,
  Plus,
  Star,
  Trash,
  Upload,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"

// Mock data structure
const mockData = {
  root: {
    name: "My Drive",
    type: "folder",
    children: ["documents", "images", "projects", "file1", "file2"],
  },
  documents: {
    name: "Documents",
    type: "folder",
    parent: "root",
    children: ["doc1", "doc2", "doc3"],
  },
  images: {
    name: "Images",
    type: "folder",
    parent: "root",
    children: ["img1", "img2"],
  },
  projects: {
    name: "Projects",
    type: "folder",
    parent: "root",
    children: ["project1", "project2"],
  },
  project1: {
    name: "Website Redesign",
    type: "folder",
    parent: "projects",
    children: ["proj1file1", "proj1file2"],
  },
  project2: {
    name: "Mobile App",
    type: "folder",
    parent: "projects",
    children: [],
  },
  doc1: {
    name: "Resume.docx",
    type: "document",
    parent: "documents",
    size: "245 KB",
    modified: "May 12, 2023",
  },
  doc2: {
    name: "Meeting Notes.docx",
    type: "document",
    parent: "documents",
    size: "125 KB",
    modified: "Jun 3, 2023",
  },
  doc3: {
    name: "Budget 2023.xlsx",
    type: "spreadsheet",
    parent: "documents",
    size: "1.2 MB",
    modified: "Apr 28, 2023",
  },
  img1: {
    name: "Vacation.jpg",
    type: "image",
    parent: "images",
    size: "3.4 MB",
    modified: "Jul 15, 2023",
  },
  img2: {
    name: "Profile Picture.png",
    type: "image",
    parent: "images",
    size: "2.1 MB",
    modified: "Aug 2, 2023",
  },
  file1: {
    name: "Presentation.pptx",
    type: "presentation",
    parent: "root",
    size: "5.7 MB",
    modified: "Jun 12, 2023",
  },
  file2: {
    name: "Important Notes.txt",
    type: "text",
    parent: "root",
    size: "12 KB",
    modified: "Aug 10, 2023",
  },
  proj1file1: {
    name: "Wireframes.pdf",
    type: "pdf",
    parent: "project1",
    size: "8.3 MB",
    modified: "Jul 23, 2023",
  },
  proj1file2: {
    name: "Design Assets.zip",
    type: "archive",
    parent: "project1",
    size: "45.2 MB",
    modified: "Jul 25, 2023",
  },
}

export function DriveUI() {
  const [currentFolder, setCurrentFolder] = useState("root")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get current folder data
  const folder = mockData[currentFolder]

  // Build breadcrumb path
  const getBreadcrumbs = () => {
    const breadcrumbs = []
    let current = folder
    breadcrumbs.unshift({ id: currentFolder, name: current.name })

    while (current.parent) {
      current = mockData[current.parent]
      breadcrumbs.unshift({ id: current.parent, name: current.name })
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  // Handle folder click
  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId)
  }

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "spreadsheet":
        return <FileText className="h-6 w-6 text-green-500" />
      case "presentation":
        return <FileText className="h-6 w-6 text-orange-500" />
      case "image":
        return <ImageIcon className="h-6 w-6 text-purple-500" />
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "archive":
        return <File className="h-6 w-6 text-gray-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  // Mock upload handler
  const handleUpload = () => {
    alert("Upload functionality would open a file picker here")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r p-4 md:flex">
        <div className="mb-6 flex items-center gap-2">
          <div className="rounded-full bg-blue-500 p-2">
            <File className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold">My Drive</h1>
        </div>

        <div className="mb-4">
          <Button className="w-full justify-start gap-2" onClick={handleUpload}>
            <Plus className="h-4 w-4" />
            New
          </Button>
        </div>

        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentFolder("root")}>
            <Home className="mr-2 h-4 w-4" />
            My Drive
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Star className="mr-2 h-4 w-4" />
            Starred
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Trash className="mr-2 h-4 w-4" />
            Trash
          </Button>
        </nav>

        <Separator className="my-4" />

        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">5.2 GB used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Folder className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Input placeholder="Search in Drive" className="w-full max-w-[400px] pl-8" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </form>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-accent" : ""}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-accent" : ""}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {/* Breadcrumbs */}
          <div className="mb-4 flex items-center text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center">
                {index > 0 && <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />}
                <button
                  onClick={() => handleFolderClick(crumb.id)}
                  className={`hover:underline ${index === breadcrumbs.length - 1 ? "font-medium" : ""}`}
                >
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{folder.name}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Folder</DropdownMenuItem>
                  <DropdownMenuItem>Document</DropdownMenuItem>
                  <DropdownMenuItem>Spreadsheet</DropdownMenuItem>
                  <DropdownMenuItem>Presentation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Files and folders */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {folder.children?.map((itemId) => {
                const item = mockData[itemId]
                return (
                  <div
                    key={itemId}
                    className="group relative flex flex-col items-center rounded-lg border p-4 transition-colors hover:bg-accent"
                  >
                    {item.type === "folder" ? (
                      <button onClick={() => handleFolderClick(itemId)} className="flex flex-col items-center">
                        <Folder className="h-12 w-12 text-blue-500" />
                        <span className="mt-2 text-center font-medium">{item.name}</span>
                      </button>
                    ) : (
                      <Link href="#" className="flex flex-col items-center">
                        {getFileIcon(item.type)}
                        <span className="mt-2 text-center font-medium">{item.name}</span>
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-lg border">
              <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-2 text-sm font-medium">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Modified</div>
                <div className="col-span-3">Size</div>
              </div>
              {folder.children?.map((itemId) => {
                const item = mockData[itemId]
                return (
                  <div key={itemId} className="grid grid-cols-12 gap-2 border-b p-2 text-sm hover:bg-accent">
                    <div className="col-span-6 flex items-center gap-2">
                      {item.type === "folder" ? (
                        <button onClick={() => handleFolderClick(itemId)} className="flex items-center gap-2">
                          <Folder className="h-5 w-5 text-blue-500" />
                          <span>{item.name}</span>
                        </button>
                      ) : (
                        <Link href="#" className="flex items-center gap-2">
                          {getFileIcon(item.type)}
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                    <div className="col-span-3 flex items-center">{item.modified || "—"}</div>
                    <div className="col-span-3 flex items-center">{item.size || "—"}</div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

