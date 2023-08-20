import express from "express";
const router = express.Router();
import { IgApiClient } from 'instagram-private-api';
import * as yup from 'yup';
const ig = new IgApiClient();
import fs from 'fs';
import { promisify } from 'util';
import { login } from '../router/controllers/api_controller.js';



router.post("/login", async (req, res) =>  {
    login(req, res);
  }
);



export default router;