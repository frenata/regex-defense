module RegexDefense exposing (..)

import Time exposing (Time, second)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL



-- Pattern Generation and Matching Stuff

type alias EditDistance = Integer
type alias PointValue = Integer

type TokenType
  = AlphaUpper
  | AlphaLower
  | NonWord
  | Digit
  | Whitespace

type alias Token =
    { token: TokenType
    , repCount: Integer
    }
  
type alias MatchPattern =
    { expression: List Token
    , minLen: Integer
    , maxLen: Integer
    }

-- Where am I supposed to put functions?

patternMorph: MatchPattern -> EditDistance -> MatchPattern

stringGen: MatchPattern -> String

missileGen: MatchPattern -> PointValue -> Position -> Missile


-- Gameplay stuff

type alias Defense =
    String

type alias Position =
    { x: Integer
    , y: Integer
    }

type alias Missile =
    { word : String
    , position: Position
    , value : PointValue
    --, dropSpeed: Integer
    }


type alias Model =
    { missiles : List Missile

    --, deadMissiles : List Missile
    }


blank =
    Model [] ""


init : ( Model, Cmd Msg )
init =
    ( blank, Cmd.none )

-- Function prototypes, not sure where these go...

-- patternMorph takes a pattern and a morph depth of n and returns a MatchPattern n edits away
patternMorph: MatchPattern -> EditDistance -> MatchPattern

-- generates strings from patterns
stringGen: MatchPattern -> String

-- generates missiles from patterns and point values... should generate own position internally? 
makeMissile: String -> PointValue -> Position -> Missile

-- Should generate missiles and antiMissiles and return a list of missiles
makeVolley: MatchPattern -> List Missile

-- UPDATE


type Msg
    = NewDefense Defense
    | Tick Time
    | NewMissile Missile
    | GenerateMissile Time


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NewDefense defense ->
            ( destroyWords defense model, Cmd.none )

        Tick ->
            ( dropMissiles model, Cmd.none )

        NewMissile missile ->
            ( addMissile missile model, Cmd.none )

        GenerateMissile ->
            ( model, genMissile )


{-| regex attack against all missile words and shield fragments
-}
destroyWords : Defense -> Model -> Model
destroyWords =
    undefined


{-| reduce height of all missiles by one
-}
dropMissiles : Model -> Model
dropMissiles model =
    let
        missiles =
            model.missiles

        dropped =
            List.map ({- decrement height -}) missiles
    in
        { model | missiles = dropped }


{-| add a missile to the model
-}
addMissile : Missile -> Model -> Model
addMissile missile model =
    { model | missiles = model.missiles ++ missile }


{-| generate a missile
-}
genMissile : Cmd Msg
genMissile =
    -- for each letter in word, generate ascii value
    -- put these in a list
    -- cast them to Char
    -- also generate column
    -- add fixed height
    Random.generate NewMissile ()


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Time.every (second) Tick -- missile drop
        , Time.every (5 * second) GenerateMissile -- new missiles
        ]
