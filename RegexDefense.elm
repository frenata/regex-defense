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


type alias Defense =
    String


type alias Missile =
    { word : String
    , column : Int
    , height : Int
    , points : Int
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
