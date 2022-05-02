import { useEffect,useState } from "react";
import { controls } from "../../../constants/controls";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { useArena } from "./useArena";

const getDamage = (attacker, defender) => {
  let damage = getHitPower(attacker) - getBlockPower(defender);
  return damage<0? 0: damage
};

const getHitPower = (fighter) => {
  return fighter.attack * (Math.random()+1)
};
const getBlockPower = (fighter) => {
  return fighter.defense * (Math.random()+1)
};

export const useFight = () => {
  const { selectedPair } = useArena();
  const { keysPressed } = useKeyPress();
  const {
    playerOneAttack,
    playerOneBlock,
    playerTwoAttack,
    playerTwoBlock,
    playerOneCriticalHitCombination,
    playerTwoCriticalHitCombination,
  } = controls;
  const [winner,setWinner] = useState('')
  const fighterOneDetails = selectedPair.playerOne
  const fighterTwoDetails =selectedPair.playerTwo

  useEffect(() => {
    let fighterOneHealth= fighterOneDetails.health
    let fighterTwoHealth = fighterTwoDetails.health
    fighterOneDetails.initialHealth = fighterOneHealth
    fighterTwoDetails.initialHealth = fighterTwoHealth
  }, [fighterOneDetails]);

  useEffect(()=>{
    if(keysPressed === playerOneAttack){
      fighterTwoDetails.health= fighterTwoDetails.health - getDamage(fighterOneDetails,fighterTwoDetails)
      if(fighterTwoDetails.health< 0){
        setWinner(fighterOneDetails)
      }
    }else if(keysPressed === playerOneBlock){
      console.log('cannot attack')
      // keyPressed !== fighterTwoAttack;
      // fighterTwoAttack = false 
    }else if(keysPressed ===playerTwoAttack){
      fighterOneDetails.health = fighterOneDetails.health -getDamage(fighterTwoDetails, fighterTwoDetails)
      if(fighterOneDetails.health < 0){
        setWinner(fighterTwoDetails)
      }
    }else if(keysPressed === playerTwoBlock){
      console.log('cannot attack')
    }else if(keysPressed === playerOneCriticalHitCombination){
        const timerOne = setTimeout(()=>{
          return 2*fighterOneDetails.attack
        },10000);
        return () => clearTimeout(timerOne);
    }else if(keysPressed === playerTwoCriticalHitCombination){
        const timerTwo = setTimeout(()=>{
          return 2*fighterTwoDetails.attack
        },10000);
        return () => clearTimeout(timerTwo);
    }else{
      console.log('Incorrect Key!')
    }
   
  },[keysPressed])

  return { 
    fighterOneDetails,
    fighterTwoDetails,
    winner
  };
};
