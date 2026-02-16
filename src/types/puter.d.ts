// Puter.js type declarations
declare global {
  interface Window {
    puter: {
      ai: {
        chat: (message: string, options?: { model?: string; stream?: boolean }) => Promise<string>
        txt2img: (prompt: string) => Promise<string>
        img2txt: (imageUrl: string) => Promise<string>
        txt2speech: (text: string) => Promise<string>
      }
      kv: {
        get: (key: string) => Promise<any>
        set: (key: string, value: any) => Promise<void>
        del: (key: string) => Promise<void>
        list: () => Promise<string[]>
        incr: (key: string, amount?: number) => Promise<number>
        decr: (key: string, amount?: number) => Promise<number>
      }
      fs: {
        write: (path: string, data: string | Blob) => Promise<void>
        read: (path: string) => Promise<string | Blob>
        mkdir: (path: string) => Promise<void>
        readdir: (path: string) => Promise<string[]>
        delete: (path: string) => Promise<void>
      }
      auth: {
        signIn: () => Promise<void>
        signOut: () => Promise<void>
        isSignedIn: () => boolean
        getUser: () => Promise<{ username: string; email: string } | null>
      }
      print: (message: string, options?: { color?: string; code?: boolean }) => void
    }
  }
}

export {}
