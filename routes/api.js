import { TestController } from "../Http/Controllers/test.controller.js";
import { Router } from "express";

import authenticateHmac from "../Http/Middlewares/hmac.middleware.js";

const router = Router();

router.post("/test", authenticateHmac, (req, res) => {
    TestController(req, res);
});

export default router;
 