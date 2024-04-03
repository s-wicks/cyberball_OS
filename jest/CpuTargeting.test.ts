import { convertTextToSchedule } from '../src/game/CpuTargeting';
import { expect, test } from '@jest/globals';
import CyberballGameModel from "../src/game/CyberballGameModel";


test('schedule text to map #1', () => {
    let scheduleText:string = '2, 1';
    let expectedScheduleMap:Map<number, number[]> = new Map<number, number[]>();

    expectedScheduleMap.set(0, [CyberballGameModel.humanPlayerId]);

    expect(convertTextToSchedule(scheduleText)).toStrictEqual(expectedScheduleMap);
})

test('schedule text to map #2', () => {
    let scheduleText:string = '2, 1, 3, 1\n3, 1, 2, 1';
    let expectedScheduleMap:Map<number, number[]> = new Map<number, number[]>();

    expectedScheduleMap.set(0, [CyberballGameModel.humanPlayerId, 1, CyberballGameModel.humanPlayerId]);
    expectedScheduleMap.set(1, [CyberballGameModel.humanPlayerId, 0, CyberballGameModel.humanPlayerId]);

    expect(convertTextToSchedule(scheduleText)).toStrictEqual(expectedScheduleMap);
})

test('schedule text to map #3', () => {
    let scheduleText:string = '2, 1';
    let expectedScheduleMap:Map<number, number[]> = new Map<number, number[]>();

    expectedScheduleMap.set(0, [CyberballGameModel.humanPlayerId])

    expect(convertTextToSchedule(scheduleText)).toStrictEqual(expectedScheduleMap);
})