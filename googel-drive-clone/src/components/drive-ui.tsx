"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, File, FileText, Folder, Home, ImageIcon, Plus, Upload } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"

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

  // Get current folder data
  const folder = mockData[currentFolder]

  // Build breadcrumb path
  const getBreadcrumbs = () => {
    const breadcrumbs = []
    let current = mockData[currentFolder]

    if (!current) {
      return [{ id: "root", name: "My Drive" }]
    }

    breadcrumbs.unshift({ id: currentFolder, name: current.name })

    while (current && current.parent) {
      const parentId = current.parent
      current = mockData[parentId]

      if (current) {
        breadcrumbs.unshift({ id: parentId, name: current.name })
      }
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
        return <FileText className="h-5 w-5 text-blue-400" />
      case "spreadsheet":
        return <FileText className="h-5 w-5 text-green-400" />
      case "presentation":
        return <FileText className="h-5 w-5 text-orange-400" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-purple-400" />
      case "pdf":
        return <FileText className="h-5 w-5 text-red-400" />
      case "archive":
        return <File className="h-5 w-5 text-gray-400" />
      default:
        return <File className="h-5 w-5 text-gray-400" />
    }
  }

  // Mock upload handler
  const handleUpload = () => {
    alert("Upload functionality would open a file picker here")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background dark">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-600 p-2">
            <File className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-white">Drive</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative max-w-md">
            <Input placeholder="Search in Drive" className="w-full pl-8 text-white" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm">
          <div className="flex items-center rounded-md bg-muted p-2">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center">
                {index > 0 && <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />}
                <button
                  onClick={() => handleFolderClick(crumb.id)}
                  className={`text-white hover:text-blue-300 ${index === breadcrumbs.length - 1 ? "font-medium" : ""}`}
                >
                  {index === 0 && <Home className="mr-1 inline h-4 w-4" />}
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action bar */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{folder.name}</h2>
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

        {/* Files and folders - List View */}
        <div className="rounded-lg border border-gray-700">
          <div className="grid grid-cols-12 gap-2 border-b border-gray-700 bg-gray-800 p-3 text-sm font-medium text-white">
            <div className="col-span-6">Name</div>
            <div className="col-span-3">Modified</div>
            <div className="col-span-3">Size</div>
          </div>
          {folder.children?.map((itemId) => {
            const item = mockData[itemId]
            return (
              <div
                key={itemId}
                className="grid grid-cols-12 gap-2 border-b border-gray-700 p-3 text-sm transition-colors hover:bg-gray-800"
              >
                <div className="col-span-6 flex items-center gap-2">
                  {item.type === "folder" ? (
                    <button onClick={() => handleFolderClick(itemId)} className="flex items-center gap-2">
                      <Folder className="h-5 w-5 text-blue-400" />
                      <span className="text-white">{item.name}</span>
                    </button>
                  ) : (
                    <Link href="#" className="flex items-center gap-2">
                      {getFileIcon(item.type)}
                      <span className="text-white">{item.name}</span>
                    </Link>
                  )}
                </div>
                <div className="col-span-3 flex items-center text-gray-300">{item.modified || "—"}</div>
                <div className="col-span-3 flex items-center text-gray-300">{item.size || "—"}</div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

