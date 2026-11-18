import type { APIRoute } from "astro";
import cv from "@cv-en";
import { render } from "@/services/harvard-cv.js";

export const GET: APIRoute = () =>
  new Response(render(cv, "en"), { headers: { "Content-Type": "text/html; charset=utf-8" } });
