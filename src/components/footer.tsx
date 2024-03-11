import Link from 'next/link'
import { Button } from './ui/button'
import { Github, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative border-t py-6 text-sm text-muted-foreground ">
      <div className="mx-auto flex w-full flex-col items-center gap-2 px-4">
        <p>© 2023 THG Store, Inc. All rights reserved.</p>
        <div className="flex gap-3">
          <Link target="_blank" href="https://github.com/thiagop90">
            <Button
              size="icon"
              variant="outline"
              className="hover:text-primary"
            >
              <Github className="h-6 w-6" strokeWidth="1.25" />
            </Button>
          </Link>
          <Link target="_blank" href="https://linkedin.com/in/psthiago">
            <Button
              size="icon"
              variant="outline"
              className="hover:text-primary"
            >
              <Linkedin className="h-6 w-6" strokeWidth="1.25" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
