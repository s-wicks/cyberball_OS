export class IntegerValueConverter {
    fromView(value) {
        value = value || 0;
        return parseInt(value);
    }
}
