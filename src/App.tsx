// import filter from 'lodash/filter';
import * as R from 'remeda';
import { useEffect, useState } from 'react';

function App() {
  const [es6MapTime, setEs6MapTime] = useState(0);
  const [lodashMapTime, setLodashMapTime] = useState(0);

  const LENGTH = 60_000_000;

  /**
   *  ? 숫자 배열 데이터
   *  * map 함수를 사용해서 3천만개의 데이터를 돌렸을때
   *  - ES6 Map 같은 경우에는 숫자였을때 3천만개를 돌렸을때 -> 0.953 초
   *
   *  - Lodash Map 같은 경우에는 숫자였을때 3천만개를 돌렸을때 -> 0.920 초
   *
   *  * map 함수를 사용해서 1억개의 데이터를 돌렸을때
   *  - ES6 Map 같은 경우에는 숫자였을때 1억개를 돌렸을때 -> 4.500 초
   *
   *  - Lodash Map 같은 경우에는 숫자였을때 1억개를 돌렸을때 -> 6.199 초
   *
   *  * map 함수로 1억 3천만 개의 데이터를 돌렸을때 [최대] (이상 돌리면 브라우저가 죽음)
   *  - ES6 Map 같은 경우에는 숫자였을때 1억 3천만개를 돌렸을때 -> 7.123 초
   *
   *  - Lodash Map 같은 경우에는 숫자였을때 1억 3천만개를 돌렸을때 -> 10.147 초
   *
   *  ! map 결론은 너무 과도하게 많은 데이터를 돌리면 es6 map이 더 빠르다. 3천만개 이하의 데이터는 lodash map이 더 빠르다.
   *
   *  ? 객체 배열 데이터
   *  * map 함수를 사용해서 3천만개의 데이터를 돌렸을때 -> lodash map이 더 빠름
   *  - ES6 Map 같은 경우에는 객체였을때 3천만개를 돌렸을때 -> 2.950 초
   *
   *  - Lodash Map 같은 경우에는 객체였을때 3천만개를 돌렸을때 -> 1.877 초
   *
   *  * map 함수를 사용해서 4천만개의 데이터를 돌렸을때 -> 명확하게 어떤게 좋은지 판단하기 어려움
   *  - ES6 Map 같은 경우에는 객체였을때 4천만개를 돌렸을때 -> 4.768 초 | 3.407 초 | 2.917 초 | 4.627 초
   *
   *  - Lodash Map 같은 경우에는 객체였을때 4천만개를 돌렸을때 -> 3.367 초 | 3.434 초 | 4.115 초 | 3.251 초
   *
   *  * map 함수를 사용해서 5천만개의 데이터를 돌렸을때 -> 명확하게 어떤게 좋은지 판단하기 어려움
   *  - ES6 Map 같은 경우에는 객체였을때 5천만개를 돌렸을때 -> 4.034 초 | 4.954 초 | 4.640 초 | 4.853 초
   *
   *  - Lodash Map 같은 경우에는 객체였을때 5천만개를 돌렸을때 -> 6.702 초 | 4.115 초 | 4.339 초 | 4.622 초
   *
   *  * map 함수를 사용해서 5천만 5백만 개의 데이터를 돌렸을때 -> es6 map이 더 빠름
   *  - ES6 Map 같은 경우에는 객체였을때 5천만 5백만개를 돌렸을때 -> 5.537 초 | 5.584 초 | 8.895 초 | 5.417 초
   *
   *  - Lodash Map 같은 경우에는 객체였을때 5천만 5백만개를 돌렸을때 -> 9.429 초 | 8.861 초 | 9.128초 | 8.659 초
   *
   *  ! map 결론은 너무 과도하게 많은 데이터를 돌리면 es6 map이 더 빠르다. 3천만개 이하의 데이터는 lodash map이 더 빠르다.
   */

  useEffect(() => {
    // ES6 map
    R.pipe(
      undefined,
      () => {
        const es6MapStart = performance.now();
        return es6MapStart;
      },
      (time) => {
        // const HALF_LENGTH = LENGTH / 2;

        // Array.from({ length: LENGTH }, (_, i) => i).map((item) => item * 2);
        Array.from({ length: LENGTH }, (_, i) => i).map((item) => ({
          id: item + 1,
          username: 'user1',
          email: 'user1@example.com',
          firstName: 'User',
          lastName: 'One',
          dateOfBirth: '1990-01-01',
          gender: 'male',
          phoneNumber: '123-456-7890',
          address: '123 Main St, Any town, USA',
          membershipStatus: 'active',
        }));
        return time;
      },
      (time) => {
        const es6MapEnd = performance.now();
        setEs6MapTime(es6MapEnd - time);
      },
    );

    R.pipe(
      undefined,
      () => {
        // Lodash map
        const lodashMapStart = performance.now();
        return lodashMapStart;
      },
      (time) => {
        // const HALF_LENGTH = LENGTH / 2;
        // map(
        //   Array.from({ length: LENGTH }, (_, i) => i),
        //   (item) => item * 2,
        // );
        R.map(
          Array.from({ length: LENGTH }, (_, i) => i),
          (item) => ({
            id: item + 1,
            username: 'user1',
            email: 'user1@example.com',
            firstName: 'User',
            lastName: 'One',
            dateOfBirth: '1990-01-01',
            gender: 'male',
            phoneNumber: '123-456-7890',
            address: '123 Main St, Any town, USA',
            membershipStatus: 'active',
          }),
        );

        return time;
      },
      (time) => {
        const lodashMapEnd = performance.now();
        setLodashMapTime(lodashMapEnd - time);
      },
    );
  }, []);

  return (
    <div>
      <p>ES6 Map 시간: {es6MapTime} 밀리초</p>
      <p>Lodash Map 시간: {lodashMapTime} 밀리초</p>
    </div>
  );
}

export default App;
