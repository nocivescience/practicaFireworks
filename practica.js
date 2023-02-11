console.clear();
const IS_MOBILE= window.innerWidth<=640
const IS_DESKTOP= window.innerHeight>800
const IS_HEADER=IS_DESKTOP&&window.innerHeight<300
//8k can restrict this if needed
const MAX_WIDTH=7680
const MAX_HEIGHT=4320
const GRAVITY=.9 //acceleration in px/s
let simSpeed=1
let scale=1
if(IS_MOVILE) scale= 0.94
if(IS_HEADER) scale= 0.75

// Width/height values that take scale into account.
// USE THESE FOR DRAWING POSITIONS
let stageW, stageH

// All quality globals will be overwritten and updated via `configDidUpdate`.
let quality=1
let isLowQuality= false
let isNormalQuality= true
let isHighQuality= false

const QUALITY_LOW= 1
const QUALITY_NORMAL=2
const QUALITY_HIGH=3

const SKY_LIGHT_NONE=0
const SKY_LIGHT_DIM=1
const SKY_LIGHT_NORMAL=2

const COLOR={
    Red: '#ff0043',
	Green: '#14fc56',
	Blue: '#1e7fff',
	Purple: '#e60aff',
	Gold: '#ffae00',
	White: '#ffffff'
}

// Special invisible color (not rendered, and therefore not in COLOR map)
const INVISIBLE='_INVISIBLE_';

const PI_2= Math.PI*2
const PI_HALF= Math.PI*.5

// Stage.disableHighDPI = true;
const trailsStage=new stageH('trails-canvas')
const mainStage= new stageH('main-canvas')
const stages=[
    trailsStage,
    mainStage
]

// Interactive state management
const store={
    _listeners: new Set(),
    _dispatch: function(){
        this._listeners.forEach(listener=>{
            listener: (this.state)
        })
    },
    state:{
        pused: false,
        longExposure: false,
        menuOpen: false,
        // Note that config values used for <select>s must be strings.
        config: {
            quality: QUALITY_NORMAL+'',
            shell: 'random',
            size: IS_DESKTOP
                ?'3' //desktop default
                : IS_HEADER
                    ? '1.2'
                    : '1',
            autoLaunch: true,
            finale: false,
            skyLighting: SKY_LIGHT_NORMAL +'',
            hideControls: IS_HEADER
        }
    },
    setState(nextState){
        this.state=Object.assign({},this.state,nextState);
        this._dispatch(),
        this.persist()
    },
    suscribe(listener){
        this._listeners.add(listener)
        
    }
}