//const video = document.getElementById('video');
const video = document.createElement("video");
const canvasElement = document.getElementById('hands');
const canvasCtx = canvasElement.getContext('2d');
let hand = false;

function captureHand(){
    hand = true;
}

const _h = new HandRecognizer();

function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    
    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 5});
            drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});

            if(hand){
                let points = new Array();
                for(const p of landmarks){
                    points.push(new Point(p.x,p.y));
                }
                let result = _h.Recognize(points,false);
                let e = "";
                if(result == "rock"){
                    e = "&#128511;";
                }else if(result == "paper"){
                    e = "&#128196;";
                }else if(result== "scissors"){
                    e = "&#9986;";
                }else if(result == "rnr"){
                    e = "&#129311;";
                }else if(result == "pistol"){
                    e = "&#128299;";
                }
                document.getElementById("sentence").innerHTML += e;
                hand = false;
            }
        }
    }
    canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(video, {
    onFrame: async () => {
        await hands.send({image: video});
    },
    width: 1280,
    height: 720
});

camera.start();

function HandRecognizer() // constructor
{
	//
	// one built-in unistroke per gesture type
	//
	this.Unistrokes = new Array(NumUnistrokes);
	this.Unistrokes[0] = new Unistroke("rock", new Array(new Point(0.4210461676120758,0.8009088635444641),new Point(0.44346216320991516,0.671402096748352),new Point(0.49736636877059937,0.5729526281356812),new Point(0.5568668246269226,0.5255427360534668),new Point(0.6044375896453857,0.5334431529045105),
                                        new Point(0.5067234039306641,0.5760059952735901),new Point(0.6037381291389465,0.6052805185317993),new Point(0.5874373316764832,0.6262755990028381),new Point(0.556861937046051,0.6299794912338257),new Point(0.5099161267280579,0.6592439413070679),
                                        new Point(0.6081129312515259,0.6730071902275085),new Point(0.587746798992157,0.6915077567100525),new Point(0.5581152439117432,0.6942788362503052),new Point(0.515929102897644,0.7449923753738403),new Point(0.6071174740791321,0.7425269484519958),
                                        new Point(0.5832983255386353,0.7600728273391724),new Point(0.5542013645172119,0.7642278671264648),new Point(0.5222048163414001,0.8303260803222656),new Point(0.593377411365509,0.8160110116004944),new Point(0.5699692368507385,0.8262248039245605),
                                        new Point(0.5408239960670471,0.8293421864509583)));
    this.Unistrokes[1] = new Unistroke("paper", new Array(new Point(0.4207325875759125,0.6706780791282654),new Point(0.4926580786705017,0.7363050580024719),new Point(0.5617149472236633,0.724163830280304),new Point(0.6119868755340576,0.7121891975402832),new Point(0.6576927900314331,0.7143975496292114),
                                        new Point(0.5890316367149353,0.6843007206916809),new Point(0.6537535190582275,0.6564074754714966),new Point(0.703078031539917,0.6319626569747925),new Point(0.7440569996833801,0.6077721118927002),new Point(0.5719092488288879,0.6614072918891907),
                                        new Point(0.6449851989746094,0.633723258972168),new Point(0.699871301651001,0.6066349744796753),new Point(0.7479304075241089,0.5790165662765503),new Point(0.5424053072929382,0.6392351984977722),new Point(0.6082509756088257,0.6156835556030273),
                                        new Point(0.659243106842041,0.5932291746139526),new Point(0.701563835144043,0.5710479617118835),new Point(0.5050771832466125,0.6172869205474854),new Point(0.5507234334945679,0.6021024584770203),new Point(0.5853726267814636,0.5919656753540039),
                                        new Point(0.6173468232154846,0.578273594379425)));
    this.Unistrokes[2] = new Unistroke("scissors", new Array(new Point(0.3659120202064514,0.6726361513137817),new Point(0.4104043245315552,0.5542938709259033),new Point(0.47401803731918335,0.5065305233001709),new Point(0.5323634743690491,0.5105578303337097),new Point(0.5723788738250732,0.5385308265686035),
                                        new Point(0.5072316527366638,0.47631576657295227),new Point(0.5880197286605835,0.4294607639312744),new Point(0.6340296864509583,0.3909858763217926),new Point(0.66998291015625,0.35970693826675415),new Point(0.51192307472229,0.5587131977081299),
                                        new Point(0.6102938055992126,0.5650863647460938),new Point(0.6675255298614502,0.57535320520401),new Point(0.709511935710907,0.5879554152488708),new Point(0.5110495090484619,0.6441522836685181),new Point(0.5735430717468262,0.6533090472221375),
                                        new Point(0.554987370967865,0.6394284963607788),new Point(0.5294631123542786,0.6361870169639587),new Point(0.5061275362968445,0.7173439264297485),new Point(0.5586669445037842,0.7040539383888245),new Point(0.5433645248413086,0.6892615556716919),
                                        new Point(0.5214481949806213,0.6921443939208984)));
    this.Unistrokes[3] = new Unistroke("rnr", new Array(new Point(0.4885893762111664,0.584881067276001),new Point(0.5352448225021362,0.5743989944458008),new Point(0.5751822590827942,0.5057842135429382),new Point(0.6010558009147644,0.4576180577278137),new Point(0.6258411407470703,0.44219934940338135),
                                        new Point(0.5558203458786011,0.41596120595932007),new Point(0.5810677409172058,0.3435303568840027),new Point(0.5953900814056396,0.30135810375213623),new Point(0.6083211898803711,0.261249303817749),new Point(0.5278593897819519,0.40167635679244995),
                                        new Point(0.5374376773834229,0.3607868254184723),new Point(0.5304526090621948,0.4260835349559784),new Point(0.5244103670120239,0.4784882068634033),new Point(0.4999246299266815,0.39484935998916626),new Point(0.5070341229438782,0.35483184456825256),
                                        new Point(0.5064550042152405,0.4230945408344269),new Point(0.5068672895431519,0.47511595487594604),new Point(0.4726237952709198,0.3935226500034332),new Point(0.4800431430339813,0.32462945580482483),new Point(0.48835116624832153,0.28389811515808105),
                                        new Point(0.49871665239334106,0.24489203095436096)));
    this.Unistrokes[4] = new Unistroke("pistol", new Array(new Point(0.37606409192085266,0.6743408441543579),new Point(0.39788931608200073,0.5718569159507751),new Point(0.43708565831184387,0.4824746251106262),new Point(0.46823355555534363,0.41621339321136475),new Point(0.4818093478679657,0.3575393855571747),
                                        new Point(0.49107614159584045,0.5190570950508118),new Point(0.5638054013252258,0.5174981355667114),new Point(0.6075196266174316,0.524811863899231),new Point(0.640630841255188,0.5325691103935242),new Point(0.500838041305542,0.5781762003898621),
                                        new Point(0.5493690371513367,0.6042681932449341),new Point(0.5281740427017212,0.6113986372947693),new Point(0.5012423992156982,0.6084660887718201),new Point(0.5004542469978333,0.6438766717910767),new Point(0.5371248722076416,0.653030514717102),
                                        new Point(0.5196783542633057,0.6600785851478577),new Point(0.49597468972206116,0.6596798896789551),new Point(0.4976709485054016,0.7084424495697021),new Point(0.5378873348236084,0.7069463729858398),new Point(0.5261977910995483,0.7052878141403198),
                                        new Point(0.5062668323516846,0.6989840269088745)));

    // 
	// The $1 Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
	//
	this.Recognize = function(points, useProtractor)
	{
		var candidate = new Unistroke("", points);

		var u = -1;
		var b = +Infinity;
		for (var i = 0; i < this.Unistrokes.length; i++) // for each unistroke template
		{
			var d;
			if (useProtractor)
				d = OptimalCosineDistance(this.Unistrokes[i].Vector, candidate.Vector); // Protractor
			else
				d = DistanceAtBestAngle(candidate.Points, this.Unistrokes[i], -AngleRange, +AngleRange, AnglePrecision); // Golden Section Search (original $1)
			if (d < b) {
				b = d; // best (least) distance
				u = i; // unistroke index
			}
		}

		return this.Unistrokes[u].Name;
	}
}