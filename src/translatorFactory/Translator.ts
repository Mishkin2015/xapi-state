import CommonTranslator from 'jscommons/dist/translatorFactory/Translator';
import TypeWarning from 'xapi-validation/dist/warnings/TypeWarning';
import InvalidContentType from '../errors/InvalidContentType';
import InvalidMethod from '../errors/InvalidMethod';
import JsonSyntaxError from '../errors/JsonSyntaxError';
import NonJsonObject from '../errors/NonJsonObject';

interface Translator extends CommonTranslator {
  readonly invalidContentTypeError: (err: InvalidContentType) => string;
  readonly invalidMethodError: (err: InvalidMethod) => string;
  readonly nonJsonObjectError: (err: NonJsonObject) => string;
  readonly xapiTypeWarning: (err: TypeWarning) => string;
  readonly jsonSyntaxError: (err: JsonSyntaxError) => string;
}

export default Translator;
