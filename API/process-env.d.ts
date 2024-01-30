declare global {
  namespace nodeJS {
    interface ProcessEnv {
      [key: string]: string
      PORT: string
    }
  }
}
