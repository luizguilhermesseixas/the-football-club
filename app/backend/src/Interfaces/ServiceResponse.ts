export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT' | 'UNPROCESSABLE';

type ServiceResponseSuccesType = 'SUCCESSFUL' | 'CREATED';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseSuccesType,
  data: T
};

export type ServiceResponse<T> =
ServiceResponseError | ServiceResponseSuccess<T>;
