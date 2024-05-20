import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TemplatesService } from '../../templates/services/templates.service';
import { ROLES } from '../../constants';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly templatesService: TemplatesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const userId = req.headers.idUser as string;
    const userRole = req.headers.roleUser as string;
    const templateId = req.params.id;

    const template = await this.templatesService.getTemplateById(templateId);

    if (!template.data) {
      throw new UnauthorizedException('Resource not found');
    }

    if (template.data.createdBy !== userId && userRole !== ROLES.ADMIN) {
      throw new UnauthorizedException(
        'You do not have permission to modify this resource',
      );
    }

    return true;
  }
}
