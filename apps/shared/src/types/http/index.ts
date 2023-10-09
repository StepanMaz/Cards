export const ContentType = {
    JSON: 'application/json',
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    MPEG: 'audio/mpeg',
    TEXT: 'text/plain',
} as const;

export const HTTPHeader = {
    CONTENT_TYPE: 'content-type',
    AUTHORIZATION: 'authorization',
} as const;