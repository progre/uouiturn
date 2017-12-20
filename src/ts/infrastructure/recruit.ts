declare var Encoding: any;
declare var CSV: any;

export function getRecruits($http: ng.IHttpService) {
    console.log('access to xd');
    $http.get('https://www.ui-turn.jp/ui/index.php/recruit/csv', {
        responseType: 'arraybuffer'
    })
        .then(response => {
        var sjisArray = new Uint8Array(<ArrayBuffer>response.data);
        var csv = Encoding.codeToString(Encoding.convert(sjisArray, 'UNICODE', 'SJIS'));
        var recruits: any[] = new CSV(csv, { header: true }).parse();
        recruits.forEach(recruit => {
            console.log(recruit);
        });
    })
        .catch(reason => {
        console.error(reason);
    });
}
