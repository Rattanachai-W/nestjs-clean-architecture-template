import { InterfaceResponseMassage } from '../response.interface';

export interface InterfaceResponse {
  response(data: InterfaceResponseMassage): any;
}
