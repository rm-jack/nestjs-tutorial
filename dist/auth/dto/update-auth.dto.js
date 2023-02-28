"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_auth_dto_1 = require("./user-auth.dto");
class UpdateAuthDto extends (0, swagger_1.PartialType)(user_auth_dto_1.UserAuthDto) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map