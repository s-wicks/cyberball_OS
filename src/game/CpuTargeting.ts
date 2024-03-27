import { SettingsModel } from '../models/settings-model';
import CyberballGameModel from './CyberballGameModel';
import CyberballGameController from './CyberballGameController';

export default function addCpuTargeting(controller: CyberballGameController, settings: SettingsModel) {
    if (settings.useSchedule) {
        addCpuTargetingSchedule(controller, settings);
    } else {
        addCpuTargetingPreference(controller, settings);
    }
}

function addCpuTargetingSchedule(controller: CyberballGameController, settings: SettingsModel) {
    let schedule = convertTextToSchedule(settings.scheduleText);
    console.log(schedule);
    
    controller.setCpuTargeting(id => {
        let scheduleQueue = schedule.get(id);
        let nextTarget = scheduleQueue.shift();
        
        let isValidTarget = (target: number) => {
            let differentFromSelf = target !== id;
            let playerStillInGame = controller.model.remainingCpuPlayerIds.has(target) || target === CyberballGameModel.humanPlayerId;
            return differentFromSelf && playerStillInGame;
        }

        while (!isValidTarget(nextTarget)) {
            if (scheduleQueue.length === 0) {
                controller.endGame("throw-count-met");
                break;
            }
            nextTarget = scheduleQueue.shift();
        }

        return nextTarget;
    });

}

function convertTextToSchedule(str: string): Map<number, number[]> {
    const lines = str.split('\n');
    const schedule = new Map<number, number[]>();

    for (const line of lines) {
        const [key, ...values] = line.split(',').map(Number);
        schedule.set(key - 2, values);
    }

    schedule.forEach((value, key) => {
        schedule.set(key, addRandomizationToScheduleNumbers(value).map(num => num - 2));
    });

    return schedule;
}

function addRandomizationToScheduleNumbers(input: number[]): number[] {
    // This array will hold the final sequence of numbers
    let newSchedule: number[] = [];

    // Iterate over each element in the input array
    input.forEach(number => {
        if (number > 9) {
            // Convert the number to a string to get individual digits
            let digits = number.toString().split('');
            // Shuffle the digits randomly
            for (let i = digits.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [digits[i], digits[j]] = [digits[j], digits[i]]; // ES6 array destructuring swap
            }
            // Convert each digit back to a number and add to the new schedule
            digits.forEach(digit => newSchedule.push(parseInt(digit)));
        } else {
            // If the number is a single digit, just add it to the new schedule
            newSchedule.push(number);
        }
    });

    // Return the new array of numbers
    return newSchedule;
}

function addCpuTargetingPreference(controller: CyberballGameController, settings: SettingsModel) {
    controller.setCpuTargeting(thrower => {
        let targetPreference = settings.computerPlayers[thrower].targetPreference;
        let probablyityDensityFunction = targetPreference.map(el => el / 100);
        let cumultiveDistributionFunction = probablyityDensityFunction.map((sum => value => sum += value)(0));
        let rand = Math.random();
        let index = cumultiveDistributionFunction.findIndex(el => rand <= el);
        if (index === thrower) {
            return CyberballGameModel.humanPlayerId;
        }
        return index;
    });

    controller.CPULeaveCallbacks.addCallback("Target Preference", (id) => {
        settings.computerPlayers.forEach(cpuSetting => {
            cpuSetting.targetPreference[id] = 0;
            let sum = cpuSetting.targetPreference.reduce((sum, value) => sum + value);
            if (sum === 0) {
                console.warn(`All targets for CPU ${id} have left!`);
                cpuSetting.throwDelay = 1_000_000_000;
                return;
            }
            cpuSetting.targetPreference = cpuSetting.targetPreference.map(el => el / sum * 100);
        });
    });
}