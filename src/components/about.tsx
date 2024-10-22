import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function About() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">About</h2>
      <div className="flex space-x-2">
        <Badge>Developer</Badge>
        <Badge>Designer</Badge>
        <Badge variant="secondary">Medical student</Badge>
      </div>
      <p>你好，我叫 Arthals，是一个兴趣使然、热爱编程的医学生。</p>
      <p>
        目前就读于北京大学医学部，同时修读计算机科学技术双学位。一边被 病理病生理药理 内外妇儿折磨，一边在 IGS 的 Lab 作业 PyTorch 中 debug 到头秃。
      </p>
      <p>我的兴趣主要在 AI 方向。</p>
      <p>我喜欢 Minecraft。</p>
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold">Hits</span>
          <span>84 / 13796</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-bold">CodeTime</span>
          <span>1062hrs 26mins</span>
        </div>
      </div>
      <Button variant="outline">More about me</Button>
    </section>
  )
}