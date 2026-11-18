import type { APIRoute } from "astro";
import cv from "@cv-es";
import { render } from "@/services/harvard-cv.js";

export const GET: APIRoute = () =>
  new Response(render(cv, "es"), { headers: { "Content-Type": "text/html; charset=utf-8" } });
