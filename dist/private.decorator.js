"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Private = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("./public.decorator");
const Private = () => (0, common_1.SetMetadata)(public_decorator_1.IS_PUBLIC_KEY, false);
exports.Private = Private;
//# sourceMappingURL=private.decorator.js.map