import { NextResponse } from "next/server";

export class ApiResponse<T = unknown> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;

  constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;
    this.data = data;
  }

  send() {
    const body: Record<string, number | string | unknown> = {
      success: this.success,
      statusCode: this.statusCode,
      message: this.message,
    };

    if (this.data !== undefined) {
      body.data = this.data;
    }

    return NextResponse.json(body, { status: this.statusCode });
  }
}
