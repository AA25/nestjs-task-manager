import { createParamDecorator } from '@nestjs/common';
import { User } from '../user.entity';

// Creating a custom @decorator
// Assuming the request has been authenticated by passport
// this decorator will return the user from the request object
export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});
