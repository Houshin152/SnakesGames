#include <SFML/Graphics.hpp>
using namespace std;
using namespace sf;
int main(){
RenderWindow window(//设置游戏窗口
    VideoMode({800,600}),
    "Snake Game"
);
while (window.isOpen())//设置Game Loop
 {
   while(const optional event = window.pollEvent())//处理所有待处理事件
   {
           if(event->is<Event::Closed>())//如果用户关闭窗口
           {
            window.close();
           }
   }

        //清屏，以显示下一次内容
        window.clear(Color::Black);
        //显示当前画面
        window.display();
 }
 return 0;
}