export interface Env {
  ASSETS?: Fetcher;
  APP: DurableObjectNamespace;
  BUNDLES?: R2Bucket;
  AI?: {
    run: (model: string, input: Record<string, unknown>, options?: Record<string, unknown>) => Promise<unknown>;
  };
  IMPORT_HMAC?: string;
  STUDIO_IMPORT_HMAC?: string;
  STUDIO_ORIGIN?: string;
  BUNDLER_PUBLIC_ORIGIN?: string;
  ALLOWED_ORIGINS?: string;
}

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type StudioImportBody = {
  source?: string;
  projectId?: string;
  slug?: string;
  title?: string;
  html?: string;
  css?: string;
  js?: string;
  files?: Array<{ path: string; content: string; contentType?: string; encoding?: "utf8" | "base64" }>;
  email?: string;
  options?: {
    title?: string;
    injectMissing?: boolean;
    keepExternal?: boolean;
    minifyCss?: boolean;
    minifyJs?: boolean;
    inlineDataUrls?: boolean;
  };
};
