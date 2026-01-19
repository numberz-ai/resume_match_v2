import svgPaths from "./svg-kzekiw670j";
import imgRectangle13 from "figma:asset/e7e38acf1ca81a3961d6fd0e8c89eadba5538a4f.png";
import imgRectangle14 from "figma:asset/023b8514e05a29117f529525d01125444010617c.png";
import imgEllipse4643 from "figma:asset/3fbb4fd183d557637767b2e54d970e1f970e3058.png";

function Frame() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path clipRule="evenodd" d={svgPaths.p27a15700} fill="var(--fill-0, #9AA6AC)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#9aa6ac] text-[14px] tracking-[-0.084px] w-[154px]">Search</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-[320px]" data-name="Text input">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[10px] py-[6px] relative rounded-[inherit] w-[320px]">
        <Frame23 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dde2e4] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p1c2fdf70} fill="var(--fill-0, #5B6871)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconButton() {
  return (
    <div className="overflow-clip relative rounded-[6px] shrink-0 size-[32px]" data-name="Icon button">
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <g id="Group">
            <g id="Vector"></g>
            <path d={svgPaths.p2dce7a00} fill="var(--fill-0, #5B6871)" id="Vector_2" />
          </g>
          <circle cx="19.4498" cy="4.3999" fill="var(--fill-0, #118B80)" id="Ellipse 13" r="2" />
        </g>
      </svg>
    </div>
  );
}

function IconButton1() {
  return (
    <div className="overflow-clip relative rounded-[6px] shrink-0 size-[32px]" data-name="Icon button">
      <Frame2 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <IconButton />
      <IconButton1 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#091b33] text-[12px] text-nowrap whitespace-pre">Albert Flores</p>
      <div className="h-[5px] relative shrink-0 w-[10px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5">
          <path d="M0 0L5 5L10 0H0Z" fill="var(--fill-0, #091B33)" fillOpacity="0.5" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame19 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(9,27,51,0.5)] text-nowrap whitespace-pre">Hiring Manager</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative rounded-[7px] shrink-0 size-[28px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[7px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[7px] size-full" src={imgRectangle13} />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[7px] size-full" src={imgRectangle14} />
        </div>
      </div>
      <Frame20 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame22 />
      <Frame21 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <TextInput />
      <Frame6 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#252c32] text-[14px] text-center text-nowrap tracking-[-0.084px] whitespace-pre">Add New Candidates</p>
      <Frame7 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[48px] items-center justify-between px-[28px] py-[8px] relative shrink-0 w-[1208px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e9eb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame8 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path clipRule="evenodd" d={svgPaths.p20a53600} fill="var(--fill-0, #118B80)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[4px] items-center pl-[2px] pr-[12px] py-[2px] relative rounded-[48px] shrink-0">
      <div aria-hidden="true" className="absolute border-[#118b80] border-[0.4px] border-solid inset-0 pointer-events-none rounded-[48px]" />
      <Frame3 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#118b80] text-[12px] text-nowrap whitespace-pre">Upload Resume</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Frame">
      <div className="absolute inset-[12.5%]">
        <img alt="" className="block max-w-none size-full" height="18" src={imgEllipse4643} width="18" />
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[4px] items-center pl-[2px] pr-[12px] py-[2px] relative rounded-[48px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#dbe9e8] border-solid inset-0 pointer-events-none rounded-[48px]" />
      <Frame4 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">Verify Details</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Frame">
      <div className="absolute inset-[12.5%]">
        <img alt="" className="block max-w-none size-full" height="18" src={imgEllipse4643} width="18" />
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[4px] items-center pl-[2px] pr-[12px] py-[2px] relative rounded-[48px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#dbe9e8] border-solid inset-0 pointer-events-none rounded-[48px]" />
      <Frame5 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">Add to Database</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-[800px]">
      <Frame39 />
      <Frame37 />
      <Frame38 />
    </div>
  );
}

function ChevronLeftLarge() {
  return (
    <div className="absolute h-[20px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[19.928px]" data-name="chevron-left-large">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-left-large">
          <rect fill="white" fillOpacity="0.01" height="20" width="19.9276" />
          <path clipRule="evenodd" d={svgPaths.p18d3680} fill="var(--fill-0, #4A5565)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BackButtonIcon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-[19.928px]" data-name="Back Button Icon">
      <ChevronLeftLarge />
    </div>
  );
}

function BackButtonContainer() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-[24px] overflow-clip top-1/2 translate-y-[-50%]" data-name="Back Button Container">
      <BackButtonIcon />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Back to Candidates</p>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="bg-[#f6f8f9] relative shrink-0 w-full" data-name="Main Content">
      <div aria-hidden="true" className="absolute border-[0.4px_0px] border-[rgba(0,101,255,0.3)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[32px] items-center justify-center px-[32px] py-[8px] relative w-full">
          <div className="basis-0 bg-[rgba(255,255,255,0)] grow h-px min-h-px min-w-px shrink-0" />
          <Frame40 />
          <div className="basis-0 bg-[rgba(255,255,255,0)] grow h-px min-h-px min-w-px shrink-0" />
          <BackButtonContainer />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p13377180} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#118b80] box-border content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[12px] py-[2px] relative rounded-[8px] shrink-0 size-[48px]" data-name="Button">
      <Frame9 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start justify-center not-italic relative shrink-0 text-nowrap w-[652px] whitespace-pre">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#252c32] text-[18px] tracking-[-0.342px]">Add Profiles to Your Database</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Upload resumes, or import in bulk, and we’ll extract the details automatically.</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Button />
      <Frame45 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[206px]">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">
        <p className="leading-none whitespace-pre">Please upload the resume to continue</p>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[4px] items-center overflow-clip relative shrink-0 w-full" data-name="title">
      <Frame43 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Frame">
          <path d={svgPaths.p38fdcb00} fill="var(--fill-0, #818B95)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center leading-[0] relative shrink-0 text-center text-nowrap">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center relative shrink-0 text-[#252c32] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.35] text-nowrap whitespace-pre">Drag and drop resume here or click to browse files</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#818b95] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.35] text-nowrap whitespace-pre">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="bg-white h-[180px] relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#d4dadd] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[14px] h-[180px] items-center justify-center px-[12px] py-[10px] relative w-full">
          <Frame10 />
          <Frame47 />
        </div>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Title />
      <Frame41 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="h-[24.138px] relative shrink-0 w-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 25">
        <g id="Frame">
          <path d={svgPaths.p3d422800} fill="var(--fill-0, #EE5F2D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#fff4f1] box-border content-stretch flex gap-[8px] items-center p-[4px] relative rounded-[3px] shrink-0">
      <Frame12 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#424242] text-[10px] text-nowrap whitespace-pre">PDF</p>
      <div className="bg-[#d9d9d9] rounded-[100px] shrink-0 size-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#424242] text-[10px] text-nowrap whitespace-pre">766 KB</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#151718] text-[12px] text-nowrap whitespace-pre">Jane Cooper.pdf</p>
      <Frame50 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Frame25 />
      <Frame26 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_142_823)" id="Frame">
          <path d={svgPaths.p10107180} id="Vector" stroke="var(--stroke-0, #E73838)" strokeLinecap="round" strokeWidth="1.2" />
        </g>
        <defs>
          <clipPath id="clip0_142_823">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[#ffe9e9] box-border content-stretch flex gap-[6.667px] items-center justify-center p-[3.333px] relative rounded-[5px] shrink-0 size-[20px]">
      <Frame13 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-[6px] pr-[10px] py-[6px] relative w-full">
          <Frame27 />
          <Frame29 />
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="h-[24.138px] relative shrink-0 w-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 25">
        <g id="Frame">
          <path d={svgPaths.p3d422800} fill="var(--fill-0, #EE5F2D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#fff4f1] box-border content-stretch flex gap-[8px] items-center p-[4px] relative rounded-[3px] shrink-0">
      <Frame14 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#424242] text-[10px] text-nowrap whitespace-pre">PDF</p>
      <div className="bg-[#d9d9d9] rounded-[100px] shrink-0 size-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#424242] text-[10px] text-nowrap whitespace-pre">766 KB</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#151718] text-[12px] text-nowrap whitespace-pre">Albert Flores.pdf</p>
      <Frame52 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Frame28 />
      <Frame30 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_142_823)" id="Frame">
          <path d={svgPaths.p10107180} id="Vector" stroke="var(--stroke-0, #E73838)" strokeLinecap="round" strokeWidth="1.2" />
        </g>
        <defs>
          <clipPath id="clip0_142_823">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div className="bg-[#ffe9e9] box-border content-stretch flex gap-[6.667px] items-center justify-center p-[3.333px] relative rounded-[5px] shrink-0 size-[20px]">
      <Frame15 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-[6px] pr-[10px] py-[6px] relative w-full">
          <Frame31 />
          <Frame32 />
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="h-[24.138px] relative shrink-0 w-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 25">
        <g id="Frame">
          <path d={svgPaths.p3d422800} fill="var(--fill-0, #EE5F2D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-[#fff4f1] box-border content-stretch flex gap-[8px] items-center p-[4px] relative rounded-[3px] shrink-0">
      <Frame16 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#424242] text-[10px] text-nowrap whitespace-pre">PDF</p>
      <div className="bg-[#d9d9d9] rounded-[100px] shrink-0 size-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#424242] text-[10px] text-nowrap whitespace-pre">766 KB</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#151718] text-[12px] text-nowrap whitespace-pre">Courtney Henry.pdf</p>
      <Frame53 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Frame33 />
      <Frame34 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_142_823)" id="Frame">
          <path d={svgPaths.p10107180} id="Vector" stroke="var(--stroke-0, #E73838)" strokeLinecap="round" strokeWidth="1.2" />
        </g>
        <defs>
          <clipPath id="clip0_142_823">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-[#ffe9e9] box-border content-stretch flex gap-[6.667px] items-center justify-center p-[3.333px] relative rounded-[5px] shrink-0 size-[20px]">
      <Frame17 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-[6px] pr-[10px] py-[6px] relative w-full">
          <Frame35 />
          <Frame36 />
        </div>
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame42 />
      <Frame49 />
      <Frame48 />
    </div>
  );
}

function Searchbar() {
  return (
    <div className="bg-[#f6f8f9] box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[12px] shrink-0 w-[740px]" data-name="searchbar">
      <div aria-hidden="true" className="absolute border border-[#e5e9eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame46 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 692 1">
            <line id="Line 27" stroke="var(--stroke-0, #64748B)" strokeOpacity="0.2" x2="692" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame44 />
      <Frame51 />
    </div>
  );
}

function ButtonTitle() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Button title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#118b80] text-[14px] text-center text-nowrap tracking-[-0.084px] whitespace-pre">Cancel</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-[120px]" data-name="Button">
      <div className="box-border content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[120px]">
        <ButtonTitle />
      </div>
      <div aria-hidden="true" className="absolute border border-[#118b80] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function ButtonTitle1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Button title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[-0.084px] whitespace-pre">Continue</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#118b80] box-border content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[6px] shrink-0 w-[120px]" data-name="Button">
      <ButtonTitle1 />
      <div className="h-[12px] relative shrink-0 w-[14.667px]" data-name="Line 2 (Stroke)">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 12">
          <path d={svgPaths.p1bdd0c00} fill="var(--fill-0, white)" id="Line 2 (Stroke)" />
        </svg>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[740px]">
      <Button1 />
      <Button2 />
    </div>
  );
}

function MainContent1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Main Content">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-center justify-center px-[24px] py-0 relative size-full">
          <Searchbar />
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <MainContent />
      <MainContent1 />
    </div>
  );
}

export default function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full">
      <Header />
      <Frame11 />
    </div>
  );
}