class PromiseCommand {
    private executing = false;

    constructor(
        private $scope: any,
        private _execute: (...args: any[]) => Promise<any>,
        private _isEnabled?: (...args: any[]) => boolean,
        private _isVisible?: (...args: any[]) => boolean) {
    }

    execute(...args: any[]) {
        if (!this.isVisible.apply(this, arguments)
            || !this.isEnabled.apply(this, arguments)) {
            return;
        }
        this.executing = true;
        (<Promise<any>>this._execute.apply(this, args))
            .catch(
            err => {
                console.error(err != null ? err.stack : 'unknown error.');
            })
            .then(
            () => {
                this.$scope.$apply(() => this.executing = false);
            });
    }

    isEnabled(...args: any[]) {
        return !this.executing
            && (this._isEnabled == null || this._isEnabled.apply(this, arguments));
    }

    isVisible(...args: any[]) {
        return this._isVisible == null || this._isVisible.apply(this, arguments);
    }
}

export = PromiseCommand;
